const Joi = require('joi');

const schemaValid3 = Joi.object({
  name: Joi.string()
    .min(6)
    .max(10)
    .required()
});

module.exports = schemaValid3;
