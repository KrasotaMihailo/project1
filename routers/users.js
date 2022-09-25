const express = require(`express`)
const router = express.Router()// определяем Router
const authorization = require(`../middlewares/authorization.js`)// импортируем мидлвейр авторизацию 
const SchemaAuth = require("../schemes/schemaAuth.js") // импортируем схему schemAuth
const SchemaBooks = require("../schemes/schemaBooks.js") // импортируем схему schemAuth

router.use(authorization)

// определяем маршруты и их обработчики внутри роутера


router.get("/:id/rating", async (req, res) => { //Обработка GET запроса, возвращает средний рейтинг всех книг, автора с id, который передается параметром
  // const booksID = await SchemaBooks.findOne({ authorId: req.params.id })

  // let k=await SchemaBooks.aggregate( [ {$group :{ _id : "$authorId", sredn: { $avg : "$rating" }}}] )
  let k = await SchemaBooks.aggregate([
    { $match: { authorId: req.params.id } },
    { $group: { _id: "$authorId", sredn: { $avg: "$rating" } } }
  ])
  res.send(`Средний рейтинг книг автора: ${k[0].sredn}`)
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
  const objPerson = await SchemaAuth.deleteOne({ ID: req.query.id })
  res.send(objPerson)
})

module.exports = router// указываем, что содержимое файла экспортируется, чтобы его можно было подключить и использовать 