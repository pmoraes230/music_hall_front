import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const createEvents = async (eventData) => {
    try {
      // Log para depuração
      console.log('FormData enviado:', [...eventData.entries()]);
  
      const response = await axios.post(`${API_URL}/eventos/`, eventData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro em createEvents:', error);
      if (error.response) {
        throw new Error(
          error.response.data.detail ||
          error.response.data.error ||
          `Erro ${error.response.status}: Não foi possível criar o evento.`
        );
      } else if (error.request) {
        throw new Error('Sem resposta do servidor. Verifique sua conexão.');
      } else {
        throw new Error(error.message || 'Erro ao criar evento.');
      }
    }
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

