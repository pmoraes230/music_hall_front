import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const createEvents = async (eventData) => {
    const token = localStorage.getItem("authToken"); // Obtém o token do usuário logado
    const userId = localStorage.getItem("userId"); // Obtém o ID do usuário logado

    // Adiciona o ID do usuário ao FormData
    eventData.append('usuario', userId);

    const response = await axios.post(`${API_URL}/eventos/`, eventData, {
        headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
            'Content-Type': 'multipart/form-data' // Necessário para enviar arquivos
        }
    });

    return response.data;
};

export const getEvents = async () => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error("Token de autenticação não encontrado.");
        }

        const response = await axios.get(`${API_URL}/eventos/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
            },
        });
        return response.data; // Retorna os dados do perfil
    } catch (error) {
        console.error("Erro ao buscar perfil:", error.response?.data || error.message);
        throw error; // Repassa o erro para ser tratado onde a função é chamada
    }
}

