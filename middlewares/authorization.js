
//Middleware
function authorization (req, res, next) {
  console.log(req.headers)  
  if (req.headers.authorization == 225 || req.method =="GET") {
      next();
      
    } else {
      res.end("Не авторизировано");
    }
  };

  module.exports=authorization// указываем, что содержимое файла экспортируется, чтобы его можно было подключить и использовать



  