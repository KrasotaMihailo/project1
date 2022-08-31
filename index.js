const express = require("express") //подключаем модуль express
const server = express() //вызываем express
const fs = require("fs")
fs.readdir(`routers`, function (err, files) {
    console.log(files)

    files.forEach(nameFile => {
       
        const moduleRouter = require(`./routers/${nameFile}`) //подключаем модуль router и указывем путь файла, в который он записан
        server.use(`/${nameFile.slice(0,-3)}`, moduleRouter)//первым аргументом передается часть роута
           })
})


server.listen(3000)









