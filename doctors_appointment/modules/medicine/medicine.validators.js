const Joi = require('joi-oid');

module.exports = {
    getById: {
        params: Joi.object({
            id: Joi.objectId(),
        }),
    },
    addMedicine: {
        payload: Joi.object({
            medicine_code: Joi.string().description('Medicine code'),
            medicine_name: Joi.string().description('Medicine name'),
            img: Joi.string().description('Medicine image'),
            use: Joi.string().description('Medicine use'),
            sideeffect: Joi.string().description('Medicine side-effects'),
            dosage: Joi.string().description('Medicine dosage'),
        }),
    },
    update: {
        payload: Joi.object({
            medicine_code: Joi.string().description('Medicine code'),
            medicine_name: Joi.string().description('Medicine name'),
            img: Joi.string().description('Medicine image'),
            use: Joi.string().description('Medicine use'),
            sideeffect: Joi.string().description('Medicine side-effects'),
            dosage: Joi.string().description('Medicine dosage'),
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
