const express = require('express'); // подключаем модуль express
const mongoose = require('mongoose');
const fs = require('fs');

mongoose
  .connect('mongodb+srv://MihailKrasota:xegfrf,hf567@33333.xo3esxv.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => {
    const server = express();

    fs.readdir('routers', (err, files) => {
      console.log(files);
      files.forEach((nameFile) => {
        // eslint-disable-next-line global-require, import/no-dynamic-require
        const moduleRouter = require(`./routers/${nameFile}`); // подключаем модуль router и указывем путь файла, в который он записан

        server.use(`/${nameFile.slice(0, -3)}`, moduleRouter);// первым аргументом передается часть роута
      });
    });
    server.listen(3000, () => {
      console.log('Server has started!');
    });
  });
