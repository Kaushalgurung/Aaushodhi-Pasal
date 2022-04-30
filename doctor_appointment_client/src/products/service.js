import axios from 'axios'
import API from '../constants/api'
import { getToken } from '../services/db';

const PRODUCTS = API.PRODUCTS;

export const getProducts = async (filter) => {
    try {
        const res = await axios.get(PRODUCTS);
        return res.data.data;
    }
    catch (err) {
        console.log(err);
        throw err;
        
        
    }
}
export const getProductById = async (id) => {
    try {
        const res = await axios.get(PRODUCTS + `/${id}`);
        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}

function toFormData(o) {
    return Object.entries(o).reduce((d, e) => (d.append(...e), d), new FormData())
}
export const deleteProduct = async (id) => {
    const res = await getToken();
    try {
        const response = await axios.delete(PRODUCTS + `/${id}`, {
            headers: { access_token: res.token }
        });
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export const addProduct = async (data) => {
    const res = await getToken();
    if(!Array.isArray(data.catagories)){
        data.catagories = data.catagories.split(',')

    }
    const formData = toFormData(data);
        formData.delete("catagories")
        data.catagories.map((req) => {
            formData.append("catagories", req)
        })
    if (res.found) {
        try {
            const response = await axios.post(PRODUCTS + `/add`, formData,
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

export const updateProduct = async (id, data) => {
    const res = await getToken();

    if(!Array.isArray(data.catagories)){
        data.catagories = data.catagories.split(',')

    }
    const formData = toFormData(data);
        formData.delete("catagories")
        data.catagories.map((req) => {
            formData.append("catagories", req)
        })

    formData.delete('_id');
    formData.delete('is_archived');
    formData.delete('is_registered');
    formData.delete('created_at');
    formData.delete('updated_at');
    formData.delete('__v');
    formData.delete('id');
    if (res.found) {
        try {
            const response = await axios.put(PRODUCTS + `/update/${id}`, formData,
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