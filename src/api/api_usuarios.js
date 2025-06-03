import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

// Função para autenticar o usuário
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/usuarios/login/`, {
            username: username, // Certifique-se de que os campos estão corretos
            password: password,
        });
        return response.data; // Retorna os dados do login
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw error;
    }
};

// Função para buscar dados protegidos usando o token
export const getProtectedData = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/usuarios/`, {
            headers: {
                Authorization: `Token ${token}`, // Envia o token no cabeçalho
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados protegidos:", error);
        throw error;
    }
};