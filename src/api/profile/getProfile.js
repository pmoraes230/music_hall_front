import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getProfile = async () => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error("Token de autenticação não encontrado.");
        }

        const response = await axios.get(`${API_URL}/perfil/`, {
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

export default getProfile;