import axios from 'axios';
import api from 'api/api';

const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = async (username, password) => {
  try {
    // Validação inicial
    if (!username || !password) {
      throw new Error('Usuário e senha são obrigatórios.');
    }

    // Faz a requisição de login
    const response = await api.post('/usuarios/login/', {
      username,
      password,
    });

    // Valida a resposta
    const { token, user_id, message } = response.data;
    if (!token || !user_id) {
      throw new Error('Resposta inválida do servidor: token ou user_id ausentes.');
    }

    // Armazena no localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('userId', user_id);

    // Retorna os dados para o componente chamador
    return {
      token,
      userId: user_id,
      message: message || 'Login realizado com sucesso!',
    };
  } catch (error) {
    // Tratamento de erros
    if (error.response) {
      throw new Error(
        error.response.data.message ||
        `Erro ${error.response.status}: Não foi possível fazer login.`
      );
    } else if (error.request) {
      throw new Error('Sem resposta do servidor. Verifique sua conexão.');
    } else {
      throw new Error(error.message || 'Erro ao fazer login.');
    }
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