const Joi = require('joi-oid');

module.exports = {
  getById: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  register: {
    payload: Joi.object({
        name: Joi.string().description('customer name'),
      email: Joi.string().description('customer email'),
      password: Joi.string().description('customer password'),
    }),
  },
  login: {
    payload: Joi.object({
      email: Joi.string().description('customer email'),
      password: Joi.string().description('customer password'),
    }),
  },
  changePassword: {
    payload: Joi.object({
      oldPassword : Joi.string().description('customer email'),
      newPassword: Joi.string().description('customer password'),
    }),
  },
  archive: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  verifyToken: {
    params: Joi.object({
      token: Joi.string(),
    }),
  },
};
