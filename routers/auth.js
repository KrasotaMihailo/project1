const express = require(`express`)
const routerAuth = express.Router()// определяем Router
const SchemaAuth = require("../schemes/schemaAuth.js") // импортируем схему schemAuth

let token = require(`../utils/generate-token.js`)//экспортируем функцию токен


//POST запросы
routerAuth.post("/sign-up", async (req, res) => { // обработка POST запроса, создает пользователя с указанными полями 
  const objPerson = new SchemaAuth({
    ID: Math.round(Math.random() * 1000),
    name: req.query.name,
    mail: [],
    mailauthor: req.query.email,
    password: req.query.password,
      })
  let n = await SchemaAuth.findOne({ mailauthor: req.query.email })
  if (n) {
    return res.send(`Автор книги с e-mail ${req.query.email} уже существует`)
  }
  if (req.query.password.length < 6) {
    return res.send(`Пароль должен содержать не менее 6 символов`)
  }
  await objPerson.save()// Сохранение данных
  res.send(objPerson)
})



routerAuth.post("/sign-in", async (req, res) => { // ищем пользователя с указанными полями
  let n = await SchemaAuth.findOne ({ mailauthor: req.query.email, password: req.query.password }) 
  if (n == undefined) {
    return res.send(`неверный логин или пароль`)
  }
    const objPerson = new SchemaAuth({
    token: token(8)
  })
  await objPerson.save()// Сохранение данных
  res.send(objPerson.token)
})


routerAuth.post("/logout", async (req, res) => { // ищем пользователя с указанными полями
  n = await SchemaAuth.findOne({ token: req.headers.authorization })
  if (n == undefined) {
    return res.send(`Нет пользователя с таким токеном`)
  }
  n.token = null//удаляем токен пользователю
  await n.save()// Сохранение данных
  res.send(n)
})




module.exports = routerAuth// указываем, что содержимое файла экспортируется, чтобы его можно было подключить и использовать 

