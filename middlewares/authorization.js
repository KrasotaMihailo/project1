const express = require(`express`)
const SchemaAuth = require("../schemes/schemaAuth") // импортируем схему schemAuth

//Middleware


function authorization(req, res, next) {
 
     const m = SchemaAuth.findOne ({token: req.headers.authorization })
  if (m == undefined) {
    return res.send("Не авторизировано")
  }
  else {
    next();
  }
};

module.exports = authorization// указываем, что содержимое файла экспортируется, чтобы его можно было подключить и использовать



