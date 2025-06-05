import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const PrivateRoute = ({ Component }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("authToken");

            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }
            try {
                // Valida o token com a API
                await axios.get(`${API_URL}/usuarios/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Erro ao validar o token:", error.response?.data || error.message);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }
    return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;