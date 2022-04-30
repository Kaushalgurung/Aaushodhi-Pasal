const Joi = require('joi');
const mongoose = require('mongoose');
const commonSchema = require('../../helpers/schema');

const schema = {
  name: {type: String, joi: Joi.string().description("User name")},
  email: { type: String, joi: Joi.string().email().optional().description("User email") },
  password: { type: String , required: true},
  is_user:{ type: Boolean, default: true},
  token: {type: String},
  ...commonSchema,
};

const CustomerSchema = mongoose.Schema(schema, {
  collection: 'customer',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

CustomerSchema.index({ email : 1 }, { unique: true });

module.exports = mongoose.model('customer', CustomerSchema);
