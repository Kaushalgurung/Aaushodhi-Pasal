import axios from "axios";
import api from "../constants/api";
import { getToken } from "../services/db";

const ADMIN = api.ADMIN; 
const CUSTOMER = api.CUSTOMER
export const login = async ({ email, password }) => {
  const form = new FormData();
  form.append("email", email);
  form.append("password", password);
  return axios
    .post(ADMIN + `/login`, form)
    .then((res) => {
      return {
        data: res,
        error: false,
      };
    })
    .catch((err) => {
      return {
        message: err.response.data.message,
        error: true,
      };
    });
};
export const changePassword = async ({ oldPassword, newPassword }) => {
    const res = await getToken();
    console.log(res);
  const form = new FormData();
  form.append("oldPassword", oldPassword);
  form.append("newPassword", newPassword);
  return axios
    .put(ADMIN + `/changepassword`, form, {
      headers: { access_token: res.token },
    })
    .then((res) => {
      return {
        data: res,
        error: false,
      };
    })
    .catch((err) => {
      console.log(err);
      return {
        message: err.response.data.message,
        error: true,
      };
    });
};

export const customerLogin = async ({ email, password }) => {
  const form = new FormData();
  form.append("email", email);
  form.append("password", password);
  return axios
    .post(CUSTOMER + `/login`, form)
    .then((res) => {
      return {
        data: res,
        error: false,
      };
    })
    .catch((err) => {
      return {
        message: err.response.data.message,
        error: true,
      };
    });
};