import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const createEvents = async (eventData) => {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(`${API_URL}/eventos/`, eventData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data;
}