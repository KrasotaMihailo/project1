const Joi = require('joi');

const schemaValid = Joi.object({
  name: Joi.string()
    .min(6)
    .max(10)
    .required(), // это поле обязательное

  password: Joi.string().min(6),
  
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});

module.exports = schemaValid;
