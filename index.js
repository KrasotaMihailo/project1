const express = require("express") //подключаем модуль express
const server = express() //вызываем express

const moduleRouter=require(`./routers/routers.js`) //подключаем модуль router и указывем путь файла, в который он записан

server.use (`/books`, moduleRouter)//первым аргументом передается часть роута

server.listen(3000)









