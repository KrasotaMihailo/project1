
//Middleware
let dataBooks = require(`../database/books.js`) // Экспортируем массив dataBooks из файла books

function authorization(req, res, next) {
  let m=dataBooks.find(elem => {return elem.authorId == req.query.authorId})
  
    if (m!==undefined || req.method == "GET") {
      next()
    }
    else { res.send(`Пользователя с id ${req.query.authorId} не существует`) }
  
}




module.exports = authorization// указываем, что содержимое файла экспортируется, чтобы его можно было подключить и использовать



