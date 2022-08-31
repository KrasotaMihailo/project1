const express = require(`express`)
const router = express.Router()// определяем Router
const authorization = require(`../middlewares/authorization.js`)// импортируем мидлвейр авторизацию 

router.use(authorization)

let mas = require(`../database/users.js`) // Экспортируем массив mas из файла users
let dataBooks = require(`../database/books.js`) // Экспортируем массив dataBooks из файла books

// определяем маршруты и их обработчики внутри роутера


// GET запросы
router.get("/", (req, res) => { //Обработка GET запроса
  console.log(req.query)
  res.send(mas)// вместо write и end (как при запуске сервера без express)
})

router.get("/:id/rating", (req, res) => { //Обработка GET запроса
  let booksID = dataBooks.filter(elem => {// находим книги запрашиваемого автора
    return elem.authorId == req.params.id
  })
 
  let masRat = []// добавляем в массив рейтинги книг
  for (let i = 0; i < booksID.length; i++) {
        let k = booksID[i]
    masRat.push(k.rating);
  }
  let sum = 0
  for (let i = 0; i < masRat.length; i++) {
    sum = sum + masRat[i]
  }
  let sredn = (sum / masRat.length).toFixed(2)// находим средний рейтинг книг
  console.log(sredn)
  res.send(`Средний рейтинг книг автора: ${sredn}`)
})



//POST запросы


router.post("/:id/subscribe", (req, res) => {
  let m = mas.find(elem => { return elem.ID == req.params.id })
  if (m == undefined) {
    return res.send(`Пользователя с id ${req.params.id} не существует`)
  } else { 
    
   m.mail.push(req.query.email)//добавляем почты подписчиков
   
  res.send(m)
  }
})

// PATCH запрос
router.patch("/", (req, res) => { // обработка PATCH запроса
  let objPerson = {} //создаем пустой объект
  objPerson.ID = req.query.ID
  objPerson.ID = Number(objPerson.ID)
  objPerson.name = req.query.name
  let ind = mas.findIndex(function (elem) { return elem.ID === objPerson.ID })
  mas.splice(ind, 1, objPerson)
  console.log(objPerson)
  console.log(mas)
  res.send(objPerson)
})
//DELETE запрос
router.delete("/", (req, res) => { // обработка DELETE запроса

  IDkey = req.query.ID
  console.log(IDkey)
  let ind = mas.findIndex(function (elem) { return elem.ID == IDkey })
  res.send(mas[ind])
  console.log(ind)
  mas.splice(ind, 1)
  console.log(mas)
})

module.exports = router// указываем, что содержимое файла экспортируется, чтобы его можно было подключить и использовать 