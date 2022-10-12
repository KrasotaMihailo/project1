const Joi = require('joi');

const schemaValid = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});

module.exports = schemaValid;
