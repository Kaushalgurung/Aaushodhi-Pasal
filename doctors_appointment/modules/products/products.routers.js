const controllers = require('./products.controllers');
const validators = require('./products.validators');

const routes = {
    list: ['GET', '', 'List all Product',],
    update: {
        method: 'PUT',
        path: '/update/{id}',
        description: 'Update Product',
        uploadPayload: {
            output: 'stream',
            parse: true,
            multipart: true,
            allow: 'multipart/form-data',
        },
        //permissions: ["admin"],
    },
    addProduct: {
        method: 'POST',
        path: '/add',
        description: 'Add new product',
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
        description: 'Archive the product',
        permissions: ["admin"],
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
