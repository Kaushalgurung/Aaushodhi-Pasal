const Joi = require("joi");
const mongoose = require("mongoose");
const commonSchema = require("../../helpers/schema");

const schema = {
  name: {
    type: String,
    required: true,
    trim: true,
    description: "Patient's name",
  },
  product_id: { type: String, description: "Product's id", required: true },
  approved: {
    type: Boolean,
    description: "Product/Item approved",
    default: false,
  },
  gender: {
    type: String,
    description: "Patient's gender",
    unique: false,
    default: "Male",
  },
  age:{
    type: Number,
    description: "Patient's Age"
  },
  completed: {
    type: Boolean,
    description: "Product/Item order completed",
    default: false,
  },
  email: {
    type: String,
    joi: Joi.string().email().optional().description("Patient's email"),
  },
  phone: { type: Number, description: "Patient's phone number" },
  medical_problem: {
    type: String,
    description: "Description of medical problem",
  },
  ...commonSchema,
};

const OrderSchema = mongoose.Schema(schema, {
  collection: "order",
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  toObject: { virtuals: true },
  
  toJSON: { virtuals: true },
});

//OrderSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("order", OrderSchema);
