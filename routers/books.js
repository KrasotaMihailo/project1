const express = require('express');
const bodyParser = require('body-parser');

const routerBooks = express.Router();// определяем Router
const SchemaBooks = require('../schemes/schemaBooks'); // импортируем схему schemAuth
const SchemaAuth = require('../schemes/schemaAuth'); // импортируем схему schemAuth

routerBooks.use(bodyParser.json());
routerBooks.use(bodyParser.urlencoded({ extended: true }));

const mailer = require('../nodemailer/nodemailer'); // подключаем модуль nodemailer и указываем путь файла, в который он записан

// определяем маршруты и их обработчики внутри роутера

// GET запрос
routerBooks.get('/', async (req, res) => { // Обработка GET запроса
  const dataBooks = await SchemaBooks.find({});

  res.send(dataBooks);
});

routerBooks.get('/:id/', async (req, res) => {
  const booksID = await SchemaBooks.find({ authorId: req.params.id });

  res.send(booksID);
});

// POST запрос
routerBooks.post('/', async (req, res) => { // создает книгу, с полями
  const objBooks = new SchemaBooks({
    title: req.body.title, // присваиваем значение, которое пришло в боди параметрах
    description: req.body.description,
    authorId: req.body.authorId,
    rating: req.body.rating
  });

  const m = await SchemaAuth.findOne({ token: req.headers.authorization });

  if (!m) {
    return res.send('Пользователя не существует');
  }
  if (req.body.rating < 0 || req.body.rating > 10) {
    return res.send('Rating должен быть от 0 до 10');
  }

  const message = {
    from: 'krasota_stud2@ukr.net', // адрес почтового ящика с которого будем отправлять подписчикам сообщение
    to: m.mail.join(', '), // адреса подписчиков, на который будет высылаться сообщение
    subject: 'Новая книга', // указывается тема письма
    text: `У автора ${m.name} появилась новая книга  ${req.body.title}` // текст письма
  };

  mailer(message);
  await objBooks.save();// Сохранение данных
  res.send(objBooks);
});

module.exports = routerBooks;// указываем, что содержимое файла экспортируется, чтобы его можно было подключить и использовать
