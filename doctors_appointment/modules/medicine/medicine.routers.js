const controllers = require('./medicine.controllers');
const validators = require('./medicine.validators');

const routes = {
    list: ['GET', '', 'List all Medicine',],
    update: {
        method: 'PUT',
        path: '/update/{id}',
        description: 'Update Medicine',
        uploadPayload: {
            output: 'stream',
            parse: true,
            multipart: true,
            allow: 'multipart/form-data',
        },
        //permissions: ["admin"],
    },
    addMedicine: {
        method: 'POST',
        path: '/add',
        description: 'Add new medicine',
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
        description: 'Archive the medicine',
        permissions: ["admin"],
    },
    getById: {
        method: 'GET',
        path: '/{id}',
        description: 'Get Medicine By id',
    },
};

function register(app) {
    app.register({
        name: 'medicines',
        routes,
        validators,
        controllers,
    });
}

module.exports = register;
