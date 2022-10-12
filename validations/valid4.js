const Joi = require('joi');

const schemaValid4 = Joi.object({
  id: Joi.number()
    .min(100)
    .max(999)
    .required()   
});

module.exports = schemaValid4;
