const Joi = require('joi');

const schemaValid1 = Joi.object({
  password: Joi.string().min(6),
  
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});

module.exports = schemaValid1;
