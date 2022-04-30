const controllers = require('./products.controllers');
const validators = require('./products.validators');

const routes = {
    list: ['GET', '', 'List all Cart Items',],
    update: {
        method: 'PUT',
        path: '/update/{id}',
        description: 'Update Cart',
        uploadPayload: {
            output: 'stream',
            parse: true,
            multipart: true,
            allow: 'multipart/form-data',
        },
        //permissions: ["admin"],
    },
    addtoCart: {
        method: 'POST',
        path: '/add',
        description: 'Add product to cart',
        uploadPayload: {
            output: 'stream',
            parse: true,
            multipart: true,
            allow: 'multipart/form-data',
        },
        //permissions: ["ADMIN"],
    },
    archive: {
        method: 'DELETE',
        path: '/{id}',
        description: 'Remove form cart',
        //permissions: ["admin"],
    },
    getById: {
        method: 'GET',
        path: '/{id}',
        description: 'Get Product By id',
    },
};

function register(app) {
    app.register({
        name: 'products',
        routes,
        validators,
        controllers,
    });
}

module.exports = register;
