const express = require("express") //подключаем модуль express
const app = express() //вызываем express

// let mas=require(`./database/users.js`) // Экспортируем массив mas из файла users
const moduleRouter=require(`./routers/routers.js`) //подключаем модуль router и указывем путь файла, в который он записан

app.use (`/users`, moduleRouter)//первым аргументом передается часть роута

app.listen(3000)
// 7777

//// 99999999999









