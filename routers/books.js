const express = require(`express`)
const router = express.Router()// определяем Router

let dataBooks = require(`../database/books.js`) // Экспортируем массив dataBooks из файла books
let mas = require(`../database/users.js`) // Экспортируем массив mas из файла users
let mailer = require(`../nodemailer/nodemailer.js`) //подключаем модуль nodemailer и указываем путь файла, в который он записан 


// определяем маршруты и их обработчики внутри роутера


//GET запрос
router.get("/", (req, res) => { //Обработка GET запроса
  res.send(dataBooks)
})

router.get("/:id/", (req, res) => {

  let booksID = dataBooks.filter(elem => {
    return elem.authorId == req.params.id
  })

  res.send(booksID)
})

//POST запрос
router.post("/", (req, res) => {
  let m = mas.find(elem => { return elem.token == req.headers.authorization })
  if (m == undefined) {
    return res.send(`Пользователя не существует`)
  }
  if (req.query.rating < 0 || req.query.rating > 10) {
    return res.send(`Rating должен быть от 0 до 10`)
  }
  let objBooks = {} //создаем пустой объект
  objBooks.title = req.query.title//присваиваем значение, которое пришло в квери параметрах 
  objBooks.description = req.query.description
  objBooks.authorId = m.ID
  objBooks.rating = req.query.rating
  dataBooks.push(objBooks)//добавляем в объект с пользователями
  let author = mas.find(elem => {
    if (elem.ID == req.query.authorId) // ищем автора по ID
    { return elem.mail }        //возвращаем почты подписчиков автора
  })

  let message = {
    from: "krasota_stud2@ukr.net", //адрес почтового ящика с которого будем отправлять подписчикам сообщение 
    to: author.mail.join(", "),//адреса подписчиков, на который будет высылаться сообщение
    subject: "Новая книга", //указывается тема письма
    text: `У автора ${author.name} появилась новая книга  ${req.query.title}` //текст письма

  }
  mailer(message)

  res.send(objBooks)

})


module.exports = router// указываем, что содержимое файла экспортируется, чтобы его можно было подключить и использовать 