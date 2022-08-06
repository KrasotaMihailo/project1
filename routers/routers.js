const express=require(`express`)
const router=express.Router()// определяем Router
const authorization=require(`./../middlewares/authorization.js`)// импортируем мидлвейр авторизацию 

router.use(authorization)

let mas=require(`./../database/users.js`) // Экспортируем массив mas из файла users

// определяем маршруты и их обработчики внутри роутера


//GET запрос
router.get("/", (req, res) => { //Обработка GET запроса
    console.log(req.query)
  
    res.send(mas)// вместо write и end (как при запуске сервера без express)
  })
  
  
  //POST запрос
  router.post("/", (req, res) => { // обработка POST запроса
    let objPerson = {} //создаем пустой объект
    let IDkey = Math.round(Math.random() * 1000)
    objPerson.ID = IDkey
    mas.push(objPerson)//добавляем в объект с пользователями
    objPerson.name = req.query.name//присваиваем имя пользователя, которое пришло в квери параметрах 
    res.send(objPerson)
  })
  
  // PATCH запрос
  router.patch("/", (req, res) => { // обработка PATCH запроса
    let objPerson = {} //создаем пустой объект
    objPerson.ID = req.query.ID
    objPerson.ID = Number(objPerson.ID)
    objPerson.name = req.query.name
    let ind = mas.findIndex(function (elem) { return elem.ID === objPerson.ID })
    mas.splice(ind, 1, objPerson)
    console.log(objPerson)
    console.log(mas)
    res.send(objPerson)
  })
  //DELETE запрос
  router.delete("/", (req, res) => { // обработка DELETE запроса
  
    IDkey = req.query.ID
    console.log(IDkey)
    let ind = mas.findIndex(function (elem) { return elem.ID == IDkey })
    res.send(mas[ind])
    console.log(ind)
    mas.splice(ind, 1)
    console.log(mas)
  })

module.exports=router// указываем, что содержимое файла экспортируется, чтобы его можно было подключить и использовать 