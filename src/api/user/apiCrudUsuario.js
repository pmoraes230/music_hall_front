import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const createUser = async (userData) => {
    const token = localStorage.getItem("authToken"); // Obtém o token de autenticação
    const response = await axios.post(`${API_URL}/usuarios/`, userData, {
        headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
        },
    });
    return response.data;
};