const Joi = require('joi-oid');

module.exports = {
    getById: {
        params: Joi.object({
            id: Joi.objectId(),
        }),
    },
    addProduct: {
        payload: Joi.object({
            product_code: Joi.string().description('Product code'),
            product_name: Joi.string().description('Product name'),
            img: Joi.string().description('Product image'),
            catagories: Joi.array().description('Product catagories'),
            use: Joi.string().description('Product use'),
            price: Joi.string().description('Product price'),
        }),
    },
    update: {
        payload: Joi.object({
            product_code: Joi.string().description('Product code'),
            product_name: Joi.string().description('Product name'),
            img: Joi.string().description('Product image'),
            catagories: Joi.array().description('Product catagories'),
            use: Joi.string().description('Product use'),
            price: Joi.string().description('Product price'),
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
