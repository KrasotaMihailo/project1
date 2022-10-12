const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();// определяем Router
const authorization = require('../middlewares/authorization');// импортируем мидлвейр авторизацию
const SchemaAuth = require('../schemes/schemaAuth'); // импортируем схему schemAuth
const SchemaBooks = require('../schemes/schemaBooks'); // импортируем схему schemAuth
const validationSchema2 = require('../validations/valid2');
const validationSchema3 = require('../validations/valid3');
const validationSchema4 = require('../validations/valid4');

router.use(authorization);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// определяем маршруты и их обработчики внутри роутера

router.get('/:id/rating', async (req, res) => { // Обработка GET запроса, возвращает срй рейтинг всех книг автора с id
  const k = await SchemaBooks.aggregate([
    { $match: { authorId: req.params.id } },
    { $group: { _id: '$authorId', sredn: { $avg: '$rating' } } }
  ]);

  res.send(`Средний рейтинг книг автора: ${k[0].sredn}`);
});

// POST запросы

router.post('/:id/subscribe', async (req, res) => { // добавляет пользователю с id параметром, подписчика с email
  const { error } = validationSchema2.validate(req.body);

  if (error) {
    console.log(error);
      
    return res.status(400).json({ message: 'error' });
  }
 
  const m = await SchemaAuth.findOne({ ID: req.params.id });

  if (!m) {
    return res.send(`Пользователя с id ${req.params.id} не существует`);
  }
  m.mail.push(req.body.email);// добавляем почты подписчиков
  await m.save();// Сохранение данных
  res.send(m);
});

// PATCH запрос
router.patch('/', async (req, res) => { // обработка PATCH запроса
  const { error } = validationSchema3.validate(req.body);

  if (error) {
    console.log(error);
      
    return res.status(400).json({ message: 'error' });
  }
  
  const objPerson = await SchemaAuth.findOne({ ID: req.params.id });

  objPerson.name = req.body.name;
  await objPerson.save();// Сохранение данных
  res.send(objPerson);
});

// DELETE запрос
router.delete('/', async (req, res) => { // обработка DELETE запроса,
  const { error } = validationSchema4.validate(req.body);
  
  if (error) {
    console.log(error);
      
    return res.status(400).json({ message: 'error' });
  }
  const objPerson = await SchemaAuth.deleteOne({ ID: req.body.id });

  res.send(objPerson);
});

module.exports = router;// указываем, что содержимое файла экспортируется, чтобы его можно было подключить и использовать
