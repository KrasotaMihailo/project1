const express = require("express") //подключаем модуль express
const server = express() //вызываем express
const fs=require("fs")
fs.readdir (`routers`, function (err,files) {
    console.log(files)
    for (let i=0; i<files.length; i++)
    {
       let nameFile=files[i]
        const moduleRouter=require(`./routers/${nameFile}`) //подключаем модуль router и указывем путь файла, в который он записан
        server.use (`/users`, moduleRouter)//первым аргументом передается часть роута
        server.use (`/books`, moduleRouter)
        server.use (`/auth`, moduleRouter)
    }
})
 

// const moduleRouterBooks=require(`./routers/routersBooks.js`) //подключаем модуль router и указывем путь файла, в который он записан
// const moduleRouterAuth=require(`./routers/routersAuth.js`) //подключаем модуль router и указывем путь файла, в который он записан





server.listen(3000)









