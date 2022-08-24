const nodemailer = require('nodemailer');


// БОЛЕЕ КОРОТКАЯ ФОРМА НАСТРОЙКИ ПОЧТОВОГО СЕРВЕРА
let transporter = nodemailer.createTransport({
    'service': 'Gmail',
    'auth': {
      'user': '&&&&&&&&', // логин моего почтового аккаунта
      'pass': '9999999999', // пароль моего почтового аккаунта
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