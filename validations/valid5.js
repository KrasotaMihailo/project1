const Joi = require('joi');

const schemaValid5 = Joi.object({
  title: Joi.string()
    .min(3)
    .max(10)
    .required(),

  description: Joi.string().min(1),

  authorId: Joi.string().min(3), 

  rating: Joi.string().min(1).max(10)
});

module.exports = schemaValid5;
