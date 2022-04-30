const Joi = require('joi');
const mongoose = require('mongoose');
const commonSchema = require('../../helpers/schema');

const schema = {
  email: { type: String, joi: Joi.string().email().optional().description("Admin email") },
  password: { type: String , required: true},
  is_admin:{ type: Boolean, default: true},
  token: {type: String},
  ...commonSchema,
};

const AdminSchema = mongoose.Schema(schema, {
  collection: 'admin',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

AdminSchema.index({ email : 1 }, { unique: true });

module.exports = mongoose.model('admin', AdminSchema);
