const Joi = require('joi');
const mongoose = require('mongoose');
//const commonSchema = require('../../helpers/medicineschema');

const schema = {
    medicine_code: {type: String, joi: Joi.string().description("Medicine code")},
    medicine_name: { type: String, joi: Joi.string().description("Medicine name")},
    img: { type: String, joi: Joi.string().optional().description("Medicine image url") },
    use: { type: String, joi: Joi.string().description("Medicine use") },
    sideeffect: {type: String, joi: Joi.string().description("Medicine Side-effect")},
    dosage: { type: String, joi: Joi.string().description("Medicine Dosage") },
    is_archived: { type: Boolean, required: true, default: false },
    //...commonSchema,
};

const MedicineSchema = mongoose.Schema(schema, {
    collection: 'medicine',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

MedicineSchema.index({ medicine_code: 1 }, { unique: true });

module.exports = mongoose.model('medicine', MedicineSchema);
