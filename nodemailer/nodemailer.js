const nodemailer = require('nodemailer');


//НАСТРОЙКА ПОЧТОВОГО СЕРВЕРА
// let transporter = nodemailer.createTransport({
//     'host': 'smtp.ethereal.email',
//     'port': 587, // порт с которого будут отправляться емейл
//     'secure': false,
//     'auth': {
//       'user': 'account', // логин моего почтового аккаунта
//       'pass': 'password', // пароль моего почтового аккаунта
//     },
//   });


// БОЛЕЕ КОРОТКАЯ ФОРМА НАСТРОЙКИ ПОЧТОВОГО СЕРВЕРА
let transporter = nodemailer.createTransport({
    'service': 'gmail',
    'auth': {
      'user': 'fbtcntu@gmail.com', // логин моего почтового аккаунта
      'pass': 'ltrfyfn2019', // пароль моего почтового аккаунта
    },
  });

  //ФУНКЦИЯ ПЕРЕДАЧИ СООБЩЕНИЯ НА ПОЧТУ
  const mailer =( message =>{
    transporter.sendMail(message, (err, info)=>{
        if(err) return console.log(err)// если отправка не прошла то в консоли увидим сообщение об ошибке
        console.log("E-mail sent: ", info)
    })
  })

  module.exports=mailer