import axios from "axios";
import API from "../constants/api";
import { getToken } from "../services/db";

const APPOINTMENT = API.APPOINTMENT;

export const getAppointments = async (filter) => {
  const res = await getToken();
  try {
    const response = await axios.get(APPOINTMENT, {
      headers: { access_token: res.token },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const addAppointment = async (data) => {
  const formData = new FormData();
  for (var key in data) {
    formData.append(key, data[key]);
  }
  try {
    const response = await axios.post(APPOINTMENT + "/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { message: "appointment added", error: false };
  } catch (err) {
    return { message: err.response.data.message, error: true };
  }
};

export const approveAppointment = async (id) => {
  const res = await getToken();
  if (res.found) {
    try {
      const response = await axios.put(
        APPOINTMENT + `/approve/${id}`,
        {},
        { headers: { access_token: res.token } }
      );
      return { message: "appointment approved", error: false };
    } catch (err) {
      return { message: err.response.data.message, error: true };
    }
  } else {
    return { message: "no access token", error: true };
  }
};


export const completeAppointment = async (id) => {
  const res = await getToken();
  if (res.found) {
    try {
      const response = await axios.put(
        APPOINTMENT + `/complete/${id}`,
        {},
        {
          headers: {
            access_token: res.token,
          },
        }
      );
      return { message: "appointment completed", error: false };
    } catch (err) {
      return { message: err.response.data.message, error: true };
    }
  } else {
    return { message: "no access token", error: true };
  }
};

export const deleteAppointment = async (id) => {
  const res = await getToken();
  if (res.found) {
    try {
      const response = await axios.delete(
        APPOINTMENT + `/${id}`,
        {
          headers: { access_token: res.token },
        }
      );
      return { message: "appointment deleted", error: false };
    } catch (err) {
      return { message: err.response.data.message, error: true };
    }
  } else {
    return { message: "no access token", error: true };
  }
};
