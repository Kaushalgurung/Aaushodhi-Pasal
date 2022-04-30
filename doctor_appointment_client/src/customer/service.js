import axios from "axios";
import api from "../constants/api";
import { getToken } from "../services/Cdb";

const CUSTOMER = api.CUSTOMER;
export const login = async ({email, password }) => {
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

export const register = async ({name, email, password}) => {
  const form = new FormData();

  form.append("name", name);
  form.append("email", email);
  form.append("password", password);
  return axios
      .post(CUSTOMER + '/register', form)
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
    .put(CUSTOMER + `/changepassword`, form, {
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
