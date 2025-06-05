import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const createProfile = async (profileData) => {
    const response = await axios.post(`${API_URL}/perfil/`, profileData)
    return response.data;
}