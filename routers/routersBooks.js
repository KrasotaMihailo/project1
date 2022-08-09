const express = require(`express`)
const router = express.Router()// определяем Router
//

let dataBooks = require(`../database/books.js`) // Экспортируем массив dataBooks из файла books
let mas = require(`./../database/users.js`) // Экспортируем массив mas из файла users


// определяем маршруты и их обработчики внутри роутера


//GET запрос
router.get("/", (req, res) => { //Обработка GET запроса
  res.send(dataBooks)
})

router.get("/:id", (req, res) => {

  let booksID = dataBooks.filter(elem => {
    return elem.authorId == req.params.id
  })

  res.send(booksID)
})

//POST запрос
router.post("/", (req, res) => {
  let m = mas.find(elem => { return elem.ID == req.query.authorId })
  if (m == undefined) {
    return res.send(`Пользователя с id ${req.query.authorId} не существует`)
  }
  if (req.query.rating < 0 || req.query.rating > 10) {
    return res.send(`Rating должен быть от 0 до 10`)
  }
  let objBooks = {} //создаем пустой объект
  objBooks.title = req.query.title//присваиваем значение, которое пришло в квери параметрах 
  objBooks.description = req.query.description
  objBooks.authorId = req.query.authorId
  objBooks.rating = req.query.rating
  res.send(objBooks)
  dataBooks.push(objBooks)//добавляем в объект с пользователями
})


module.exports = router// указываем, что содержимое файла экспортируется, чтобы его можно было подключить и использовать 