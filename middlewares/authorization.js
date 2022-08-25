const express = require(`express`)

//Middleware

let mas = require(`./../database/users.js`) // Экспортируем массив mas из файла users

function authorization(req, res, next) {
 
     let m = mas.find(elem => { return elem.token == req.headers.authorization })
  if (m == undefined) {
    return res.send("Не авторизировано")
  }
  else {
    next();
  }
};

module.exports = authorization// указываем, что содержимое файла экспортируется, чтобы его можно было подключить и использовать



