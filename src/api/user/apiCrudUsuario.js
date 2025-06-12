import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Helper function to get the auth token
const getAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('No authentication token found');
    }
    return { Authorization: `Bearer ${token}` };
};

export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/usuarios/`, userData, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        throw error
    }
};

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/usuarios/`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching users');
    }
};

export const updateUsers = async (userData) => {
    try {
        const id = localStorage.getItem('userId');
        if (!id) {
            throw new Error('No user ID found in localStorage');
        }

        const payload = {
            nome: userData.nome,
            login: userData.login,
            cpf: userData.cpf,
            id_perfil: userData.id_perfil,
            e_mail: userData.e_mail,
            ...(userData.senha && { senha: userData.senha }),
        };
        const response = await axios.put(`${API_URL}/usuarios/${id}/`, payload, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('[apiCrudUsuario] Error updating user:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error updating user');
    }
};

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/usuarios/${id}/`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching user');
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/usuarios/${id}/`, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error deleting user');
    }
};