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
  doctor_id: { type: String, description: "Doctor's id", required: true },
  approved: {
    type: Boolean,
    description: "Prescription approved",
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
    description: "Prescription order completed",
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

const AppointmentSchema = mongoose.Schema(schema, {
  collection: "appointment",
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

//AppointmentSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("appointment", AppointmentSchema);
