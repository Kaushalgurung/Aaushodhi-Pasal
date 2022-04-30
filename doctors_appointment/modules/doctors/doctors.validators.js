const Joi = require('joi-oid');

module.exports = {
  getById: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  register: {
    payload: Joi.object({
      img: Joi.string().description('Pharmacy image'),
      name: Joi.string().description('Pharmacy Name'),
      phone: Joi.number().optional().description('Pharmacy phone'),
      email: Joi.string().description('Pharmacy email'),
      address: Joi.string().optional().description('Pharmacy physical address'),
      designation: Joi.string().optional().description('Pharmacy designation'),
      description: Joi.string().optional().description('Pharmacy description'),
    }),
  },
  update: {
    payload: Joi.object({
      img: Joi.string().description('Pharmacy image'),
      name: Joi.string().description('Pharmacy Name'),
      phone: Joi.number().optional().description('Pharmacy phone'),
      email: Joi.string().description('Pharmacy email'),
      address: Joi.string().optional().description('Pharmacy physical address'),
      designation: Joi.string().optional().description('Pharmacy designation'),
      description: Joi.string().optional().description('Pharmacy description'),
    }),
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  archive: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
};
