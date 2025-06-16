import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

export const pushSeat = async (dataEvents) => {
    const response = await axios.post(`${API_URL}/setores/`, dataEvents);
    return response.data;
}

export const getEvents = async () => {
    const response = await axios.get(`${API_URL}/eventos/`);
    return response.data;
}

export const reserveSeats = async (reservationData) => {
    const response = await axios.post(`${API_URL}/reservar-cadeiras/`, reservationData);
    return response.data;
}