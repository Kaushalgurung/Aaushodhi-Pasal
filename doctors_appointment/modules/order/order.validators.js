const Joi = require('joi-oid');


module.exports = {
  getById: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  register: {
    payload: Joi.object({
      name: Joi.string().description("Patients Name"),
      age: Joi.number().description("Patient's age"),
      product_id: Joi.string().description("Pharmacy's id"),
      phone: Joi.number().optional().description("Patient's phone"),
      email: Joi.string().description("Patient's email"),
      gender: Joi.string().description("Patient's gender"),
      medical_problem: Joi.string()
        .optional()
        .description("Medicial problem description"),
      problem_doc: Joi.any().meta({ swaggerType: 'file' }).description('Issuer Documents'),
    }),
  },
  update: {
    payload: Joi.object({
      name: Joi.string().description("Patients Name"),
      age: Joi.number().description("Patient's age"),
      phone: Joi.number().optional().description("Patient's phone"),
      email: Joi.string().description("Patient's email"),
      gender: Joi.string().description("patient's gender"),
      medical_problem: Joi.string()
        .optional()
        .description("Medicial problem description"),
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
  approve: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  complete: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  getByDoctorId: {
    params: Joi.object({
      product_id: Joi.objectId(),
    }),
  },
  getProblemDoc: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
};
