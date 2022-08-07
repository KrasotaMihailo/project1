const express = require(`express`)
const router = express.Router()// определяем Router
const authorization = require(`./../middlewares/authorization.js`)// импортируем мидлвейр авторизацию 
const ratingControl=require (`./../middlewares/rating.js`)
router.use(authorization)
router.use(ratingControl)

let dataBooks = require(`../database/books.js`) // Экспортируем массив dataBooks из файла books

// определяем маршруты и их обработчики внутри роутера


//GET запрос
router.get("/", (req, res) => { //Обработка GET запроса
  res.send(dataBooks)// вместо write и end (как при запуске сервера без express)
})

router.get("/:id", (req, res) => { 
  
  booksID=dataBooks.filter (elem=> {
    return elem.authorId==req.params.id
    
  })
  
    res.send(booksID)
})

//POST запрос
router.post("/", (req, res) => { // обработка POST запроса
  let objBooks = {} //создаем пустой объект
  objBooks.title = req.query.title//присваиваем значение, которое пришло в квери параметрах 
  objBooks.description = req.query.description
  objBooks.authorId = req.query.authorId
  objBooks.rating = req.query.rating
  res.send(objBooks)
  dataBooks.push(objBooks)//добавляем в объект с пользователями
})


module.exports = router// указываем, что содержимое файла экспортируется, чтобы его можно было подключить и использовать 