const express = require('express');

const routerAuth = express.Router();// определяем Router
const bodyParser = require('body-parser');
const SchemaAuth = require('../schemes/schemaAuth'); // импортируем схему schemAuth

const token = require('../utils/generate-token');// экспортируем функцию токен

const validationSchema = require('../validations/valid');
const validationSchema1 = require('../validations/valid1');

routerAuth.use(bodyParser.json());
routerAuth.use(bodyParser.urlencoded({ extended: true }));

// POST запросы
routerAuth.post('/sign-up', async (req, res) => { // регистрация
  const { error } = validationSchema.validate(req.body);

  if (error) {
    console.log(error);
      
    return res.status(400).json({ message: 'error' });
  }

  const objPerson = new SchemaAuth({
    ID: Math.round(Math.random() * 1000),
    name: req.body.name,
    mail: [],
    mailauthor: req.body.email,
    password: req.body.password
  });

  const n = await SchemaAuth.findOne({ mailauthor: req.body.email });

  if (n) {
    return res.send(`Автор книги с e-mail ${req.body.email} уже существует`);
  }
  await objPerson.save();// Сохранение данных
  res.send(objPerson);
});

routerAuth.post('/sign-in', async (req, res) => { // авторизация
  const { error } = validationSchema1.validate(req.body);

  if (error) {
    console.log(error);
      
    return res.status(400).json({ message: 'error' });
  }  
  const user = await SchemaAuth.findOne({ mailauthor: req.body.email, password: req.body.password });
  
  if (!user) {
    return res.send('неверный логин или пароль');
  }
  user.token = token(8);
  await user.save();// Сохранение данных
  res.send(user.token);
});

routerAuth.post('/logout', async (req, res) => { // разавторизация
  const n = await SchemaAuth.findOne({ token: req.headers.authorization });
  
  if (!n) {
    return res.send('Нет пользователя с таким токеном');
  }
  n.token = null;// удаляем токен пользователю
  await n.save();// Сохранение данных
  res.send(n);
});

module.exports = routerAuth;// указываем, что содержимое файла экспортируется, чтобы его можно было подключить и использовать
