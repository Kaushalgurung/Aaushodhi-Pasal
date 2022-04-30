const controllers = require("./order.controllers");
const validators = require("./order.validators");

const routes = {
  list: ["GET", "", "List all Orders"],
  update: {
    method: "PUT",
    path: "/update/{id}",
    description: "Update Order",
    uploadPayload: {
      output: "stream",
      parse: true,
      multipart: true,
      allow: "multipart/form-data",
    },
    permissions: ["admin"],
  },
  register: {
    method: "POST",
    path: "/register",
    description: "Register new Order",
    uploadPayload: {
      output: "stream",
      parse: true,
      multipart: true,
      allow: "multipart/form-data",
    },
  },
  archive: {
    method: "DELETE",
    path: "/{id}",
    description: "Archive the Order",
    permissions: ["admin"],
  },
  approve: {
    method: "PUT",
    path: "/approve/{id}",
    description: "Approve a Order",
    permissions: ["admin"],
  },
  complete: {
    method: "PUT",
    path: "/complete/{id}",
    description: "Approve a Order",
    permissions: ["admin"],
  },
  getById: {
    method: "GET",
    path: "/{id}",
    description: "Get prescription By id",
  },
  getByDoctorId: {
    method: "GET",
    path: "/getbydocid/{doctor_id}",
    description: "Get prescription By product id",
  },
  getProblemDoc: {
    method: "GET",
    path: "/problem/{id}",
    description: "get prescription file",
  },
};

function register(app) {
  app.register({
    name: "order",
    routes,
    validators,
    controllers,
  });
}

module.exports = register;
