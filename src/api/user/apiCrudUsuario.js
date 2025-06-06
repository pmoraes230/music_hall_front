import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const createUser = async (userData) => {
    const token = localStorage.getItem('authToken');
    const response = await axios.post(`${API_URL}/usuarios/`, userData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}

export const getUsers = async () => {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`${API_URL}/usuarios/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}