const Joi = require('joi');
const mongoose = require('mongoose');
//const commonSchema = require('../../helpers/productschema');

const schema = {
    Customer_id: {type: String, joi: Joi.string().description("Customer ID")},
    products: [
        {
            productId:{type: String, require: true},
            quantity: {type:Number, default: 1},
            price: {type: Number, require: true}
        },
        {
            timestamps: true,
        }
    ],

    //...commonSchema,
};

const CartSchema = mongoose.Schema(schema, {
    collection: 'cart',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

//CartSchema.index({ product_code: 1 }, { unique: true });

module.exports = mongoose.model('cart', CartSchema);
