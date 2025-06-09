import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Função para autenticar o usuário
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/usuarios/login/`, {
            username: username, // Certifique-se de que os campos estão corretos
            password: password,
        });
        
        const { token, user_id} = response.data;

        localStorage.setItem('authToken', token); // Armazena o token no localStorage
        localStorage.setItem('userId', user_id); // Armazena o ID do usuário no localStorage
    } catch (error) {
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
        throw error;
    }
};