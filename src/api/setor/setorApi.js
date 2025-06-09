import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const pushSetor = async (dataEvents) => {
    const response = await axios.post(`${API_URL}/setores/`, dataEvents)
    return response.data;
}