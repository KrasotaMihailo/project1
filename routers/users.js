const express = require(`express`)
const router = express.Router()// определяем Router
const authorization = require(`../middlewares/authorization.js`)// импортируем мидлвейр авторизацию 
const SchemaAuth = require("../schemes/schemaAuth") // импортируем схему schemAuth
const SchemaBooks = require("../schemes/schemaBooks") // импортируем схему schemAuth

router.use(authorization)

// определяем маршруты и их обработчики внутри роутера


router.get("/:id/rating", async (req, res) => { //Обработка GET запроса, возвращает средний рейтинг всех книг, автора с id, который передается параметром
  const booksID = await SchemaBooks.find({ authorId: req.params.id })

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
  console.log(booksID)
  res.send(`Средний рейтинг книг автора: ${sredn}`)
})



//POST запросы

router.post("/:id/subscribe", async (req, res) => { //добавляет пользователю с id параметром, подписчика с email, который передается query параметром.
  const m = await SchemaAuth.findOne({ ID: req.params.id })
  if (m == undefined) {
    return res.send(`Пользователя с id ${req.params.id} не существует`)
  } else {

    m.mail.push(req.query.email)//добавляем почты подписчиков

    await m.save()// Сохранение данных

    res.send(m)
  }
})

// PATCH запрос
router.patch("/", async (req, res) => { // обработка PATCH запроса
  const objPerson = await SchemaAuth.findOne({ ID: req.params.id })
  objPerson.name = req.query.name
  await objPerson.save()// Сохранение данных
  res.send(objPerson)
})

//DELETE запрос
router.delete("/", async (req, res) => { // обработка DELETE запроса,
  const objPerson = await SchemaAuth.deleteOne({ID: req.query.id})
  console.log(req.query.id)
      res.send(objPerson)
})

module.exports = router// указываем, что содержимое файла экспортируется, чтобы его можно было подключить и использовать 