const Joi = require('joi');
const mongoose = require('mongoose');
//const commonSchema = require('../../helpers/productschema');

const schema = {
    product_code: {type: String, joi: Joi.string().description("Product code")},
    product_name: { type: String, joi: Joi.string().description("Product name")},
    img: { type: String, joi: Joi.string().optional().description("Product image url") },
    catagories: { type: Array, joi: Joi.array().description("Product catagories") },
    use: { type: String, joi: Joi.string().description("Product use") },
    price: { type: String, joi: Joi.string().description("Product price") },
    is_archived: { type: Boolean, required: true, default: false },
    //...commonSchema,
};

const ProductSchema = mongoose.Schema(schema, {
    collection: 'product',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

ProductSchema.index({ product_code: 1 }, { unique: true });

module.exports = mongoose.model('product', ProductSchema);
