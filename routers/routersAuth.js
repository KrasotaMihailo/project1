const express = require(`express`)
const routerAuth = express.Router()// определяем Router




let mas = require(`./../database/users.js`) // Экспортируем массив mas из файла users



//POST запросы
routerAuth.post("/sign-up", (req, res) => { // обработка POST запроса, создает пользователя с указанными полями 
  let objPerson = {} //создаем юзера
  let IDkey = Math.round(Math.random() * 1000)
  objPerson.ID = IDkey
  objPerson.mail = []// поле для емейлов подписчиков
  objPerson.mailauthor = req.query.email
  let n = mas.find(elem => { return elem.mailauthor == req.query.email })
  if (n !== undefined) {
    return res.send(`Автор книги с e-mail ${req.query.email} уже существует`)
  }
  objPerson.name = req.query.name//присваиваем имя пользователя, которое пришло в квери параметрах 
  objPerson.password = req.query.password
  if (req.query.password.length < 6) {
    return res.send(`Пароль должен содержать не менее 6 символов`)
  }
  mas.push(objPerson)//добавляем в объект с пользователями
  res.send(objPerson)
})

routerAuth.post("/sign-in", (req, res) => { // ищем пользователя с указанными полями

  let n = mas.find(elem => { return elem.mailauthor == req.query.email })
  if (n == undefined) {
    return res.send(`неверный логин или пароль`)
  }
  
  let k = mas.find(elem => { return elem.password == req.query.password })
  if (k == undefined) {
    return res.send(`неверный логин или пароль`)
  } 

  function token(sumString) {
    const symbolArr = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    var randomString = "";
    for (let i = 0; i < sumString; i++) {
      var index = Math.floor(Math.random() * symbolArr.length);
      randomString += symbolArr[index];
    }
    return randomString;
  }
    tokenValues=token(8)
  k.token=tokenValues//добавляем токен пользователю

  console.log(k)
  res.send(tokenValues)
})

routerAuth.post("/logout", (req, res) => { // ищем пользователя с указанными полями

  let n = mas.find(elem => { return elem.token == req.headers.authorization})
  if (n == undefined) {
    return res.send(`Нет пользователя с таким токеном`)
  }
      
  n.token=null//удаляем токен пользователю
  
  res.send(n)
})




module.exports = routerAuth// указываем, что содержимое файла экспортируется, чтобы его можно было подключить и использовать 
