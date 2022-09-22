const express = require(`express`)
const routerBooks = express.Router()// определяем Router
const SchemaBooks = require("../schemes/schemaBooks") // импортируем схему schemAuth
const SchemaAuth = require("../schemes/schemaAuth") // импортируем схему schemAuth

let mailer = require(`../nodemailer/nodemailer.js`) //подключаем модуль nodemailer и указываем путь файла, в который он записан 



// определяем маршруты и их обработчики внутри роутера

//GET запрос
routerBooks.get("/", async (req, res) => { //Обработка GET запроса
  const dataBooks=await SchemaBooks.find ({})
  res.send(dataBooks)
})


routerBooks.get("/:id/", async (req, res) => {
  const booksID =await SchemaBooks.find({authorId: req.params.id})
  res.send(booksID)
})

//POST запрос
routerBooks.post("/", async (req, res) => { //создает книгу, с полями
  const objBooks=new SchemaBooks ({
    title: req.query.title, //присваиваем значение, которое пришло в квери параметрах 
    description: req.query.description,
    authorId: req.headers.authorization,
    rating: req.query.rating
  })
  
  const m = await SchemaAuth.findOne ({token: req.headers.authorization })
  if (m == undefined) {
    return res.send(`Пользователя не существует`)
  }
  if (req.query.rating < 0 || req.query.rating > 10) {
    return res.send(`Rating должен быть от 0 до 10`)
  }
     
    let message = {
    from: "krasota_stud2@ukr.net", //адрес почтового ящика с которого будем отправлять подписчикам сообщение 
    to: SchemaAuth.mail,//адреса подписчиков, на который будет высылаться сообщение
    subject: "Новая книга", //указывается тема письма
    text: `У автора ${SchemaAuth.name} появилась новая книга  ${req.query.title}` //текст письма

  }
  mailer(message)
console.log (SchemaAuth.mail)
  await objBooks.save()// Сохранение данных
  res.send(objBooks)

})


module.exports = routerBooks// указываем, что содержимое файла экспортируется, чтобы его можно было подключить и использовать 