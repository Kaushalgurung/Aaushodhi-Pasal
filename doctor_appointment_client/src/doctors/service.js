import axios from 'axios'
import API from '../constants/api'
import { getToken } from '../services/db';

const DOCTORS = API.DOCTORS;

export const getDoctors = async (filter) => {
    try {
        const res = await axios.get(DOCTORS);
        return res.data.data;
    }
    catch (err) {
        console.log(err);
    }
}
export const getDoctorById = async (id) => {
    try {
        const res = await axios.get(DOCTORS + `/${id}`);
        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}

export const deleteDoctor = async (id) => {
    const res = await getToken();
    try {
        const response = await axios.delete(DOCTORS + `/${id}`, {
            headers: { access_token: res.token }
        });
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export const addDoctor = async (data) => {
    const res = await getToken();
    const formData = new FormData();
    for (var key in data) {
        formData.append(key, data[key]);
    }
    if (res.found) {
        try {
            const response = await axios.post(DOCTORS + `/register`, formData,
                { headers: { access_token: res.token } },
            );
            return {
                success: true,
                res: response
            }
        } catch (err) {
            return {
                success: false,
                message: err.response
            }
        }
    }
}

export const updateDoctor = async (id, data) => {
    const res = await getToken();
    const formData = new FormData();
    for (var key in data) {
        formData.append(key, data[key]);
    }
    formData.delete('_id');
    formData.delete('is_archived');
    formData.delete('is_registered');
    formData.delete('created_at');
    formData.delete('updated_at');
    formData.delete('__v');
    formData.delete('id');
    if (res.found) {
        try {
            const response = await axios.put(DOCTORS + `/update/${id}`, formData,
                { headers: { access_token: res.token } },
            );
            return {
                success: true,
                res: response
            }
        } catch (err) {
            return {
                success: false,
                message: err.response
            }
        }
    }
}