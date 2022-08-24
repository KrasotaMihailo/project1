const express = require("express") //подключаем модуль express
const server = express() //вызываем express

const moduleRouter=require(`./routers/routers.js`) //подключаем модуль router и указывем путь файла, в который он записан
const moduleRouterBooks=require(`./routers/routersBooks.js`) //подключаем модуль router и указывем путь файла, в который он записан
const moduleRouterAuth=require(`./routers/routersAuth.js`) //подключаем модуль router и указывем путь файла, в который он записан

server.use (`/users`, moduleRouter)//первым аргументом передается часть роута
server.use (`/books`, moduleRouterBooks)
server.use (`/auth`, moduleRouterAuth)

server.listen(3000)









