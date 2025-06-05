import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ Component }) => {
    const token = localStorage.getItem('authToken');

    return (
        !token ? <Component /> : <Navigate to="/home"/>
    )
}

export default PublicRoute;