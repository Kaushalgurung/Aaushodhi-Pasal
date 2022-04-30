const { Customer } = require('./customer.controllers');
const controllers = require('./customer.controllers');
const validators = require('./customer.validators');

const routes = {
  // list: {
  //   method: 'GET',
  //   path: '/list',
  //   description: 'List all users',
  //   permissions: [customer.READ, customer.ADMIN]
  //  },
  register: {
    method: 'POST',
    path: '/register',
    description: 'Add Customer',
    uploadPayload: {
      output: 'stream',
      parse: true,
      multipart: true,
      allow: 'multipart/form-data',
    },
    //permissions: ["ADMIN"],
  },
  login: {
    method: 'POST',
    path: '/login',
    description: 'Login Customer',
    uploadPayload: {
      output: 'stream',
      parse: true,
      multipart: true,
      allow: 'multipart/form-data',
    },
  },
  changePassword: {
    method: 'PUT',
    path: '/changepassword',
    description: 'Change customer password',
    uploadPayload: {
      output: 'stream',
      parse: true,
      multipart: true,
      allow: 'multipart/form-data',
    },
  },
  archive: ['DELETE', '/{id}', 'Archive the customer'],
  verifyToken: ['GET', '/validate/{token}', 'Verify Token'],
};

function register(app) {
  app.register({
    name: 'customer',
    routes,
    validators,
    controllers,
  });
}

module.exports = register;
