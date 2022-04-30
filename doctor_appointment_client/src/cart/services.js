import axios from "axios";
import API from "../constants/api";
import { getToken } from "../services/db";

const CART = API.CARTS;

export const getCarts = async (filter) => {
  const res = await getToken();
  try {
    const response = await axios.get(CART, {
      headers: { access_token: res.token },
    });
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const addCart = async (data) => {
  const formData = new FormData();
  for (var key in data) {
    formData.append(key, data[key]);
  }
  try {
    const response = await axios.post(CART + "/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { message: "cart added", error: false };
  } catch (err) {
    return { message: err.response.data.message, error: true };
  }
};

export const approveCart = async (id) => {
  const res = await getToken();
  if (res.found) {
    try {
      const response = await axios.put(
        CART + `/approve/${id}`,
        {},
        { headers: { access_token: res.token } }
      );
      return { message: "cart approved", error: false };
    } catch (err) {
      return { message: err.response.data.message, error: true };
    }
  } else {
    return { message: "no access token", error: true };
  }
};


export const completeCart = async (id) => {
  const res = await getToken();
  if (res.found) {
    try {
      const response = await axios.put(
        CART + `/complete/${id}`,
        {},
        {
          headers: {
            access_token: res.token,
          },
        }
      );
      return { message: "cart completed", error: false };
    } catch (err) {
      return { message: err.response.data.message, error: true };
    }
  } else {
    return { message: "no access token", error: true };
  }
};

export const deleteCart = async (id) => {
  const res = await getToken();
  if (res.found) {
    try {
      const response = await axios.delete(
        CART + `/${id}`,
        {
          headers: { access_token: res.token },
        }
      );
      return { message: "cart deleted", error: false };
    } catch (err) {
      return { message: err.response.data.message, error: true };
    }
  } else {
    return { message: "no access token", error: true };
  }
};
