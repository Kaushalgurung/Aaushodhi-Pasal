const Joi = require('joi');
const mongoose = require('mongoose');
const commonSchema = require('../../helpers/schema');

const schema = {
  img:{type:String, required:true, description: "Image of Pharmacy" },
  name: {
    type: String,
    required: true,
    trim: true,
    description: 'Name of the Pharmacy',
  },
  phone: { type: String, description: "Pharmacy's phone" },
  email: { type: String, joi: Joi.string().email().optional().description("Pharmacy's email"), unique: true },
  address: { type: String, description: "Pharmacy's  address" },
  designation: { type: String, description: "Pharmacy's designation" },
  description: { type: String, description: "Pharmacy's description" },
  ...commonSchema,
};

const DoctorSchema = mongoose.Schema(schema, {
  collection: 'doctor',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

DoctorSchema.index({ email : 1 }, { unique: true });

module.exports = mongoose.model('doctor', DoctorSchema);
