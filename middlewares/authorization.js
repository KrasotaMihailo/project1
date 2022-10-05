const SchemaAuth = require('../schemes/schemaAuth'); // импортируем схему schemAuth

// Middleware

function authorization(req, res, next) {
  const m = SchemaAuth.findOne({ token: req.headers.authorization });

  if (m === undefined) {
    return res.send('Не авторизировано');
  }

  next();
}
module.exports = authorization;// указываем, что содержимое файла экспортируется
