import axios from "axios";
import API from "../constants/api";
import { getToken } from "../services/db";

const ORDER = API.ORDERS;

export const getOrders = async (filter) => {
  const res = await getToken();
  try {
    const response = await axios.get(ORDER, {
      headers: { access_token: res.token },
    });
    console.log(response.data)
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const addOrder = async (data) => {
  const formData = new FormData();
  for (var key in data) {
    formData.append(key, data[key]);
  }
  try {
    const response = await axios.post(ORDER + "/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { message: "order added", error: false };
  } catch (err) {
    return { message: err.response.data.message, error: true };
  }
};

export const approveOrder = async (id) => {
  const res = await getToken();
  if (res.found) {
    try {
      const response = await axios.put(
        ORDER + `/approve/${id}`,
        {},
        { headers: { access_token: res.token } }
      );
      return { message: "order approved", error: false };
    } catch (err) {
      return { message: err.response.data.message, error: true };
    }
  } else {
    return { message: "no access token", error: true };
  }
};


export const completeOrder = async (id) => {
  const res = await getToken();
  if (res.found) {
    try {
      const response = await axios.put(
        ORDER + `/complete/${id}`,
        {},
        {
          headers: {
            access_token: res.token,
          },
        }
      );
      return { message: "order completed", error: false };
    } catch (err) {
      return { message: err.response.data.message, error: true };
    }
  } else {
    return { message: "no access token", error: true };
  }
};

export const deleteOrder = async (id) => {
  const res = await getToken();
  if (res.found) {
    try {
      const response = await axios.delete(
        ORDER + `/${id}`,
        {
          headers: { access_token: res.token },
        }
      );
      return { message: "order deleted", error: false };
    } catch (err) {
      return { message: err.response.data.message, error: true };
    }
  } else {
    return { message: "no access token", error: true };
  }
};
