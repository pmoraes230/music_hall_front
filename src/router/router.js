import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./login";
import registerUser from "./registerUser";
import { Home } from "./Home/Home";
import RegisterSetor from "./registerSetor";
import registerEvents from "./registerEvents";
import PrivateRoute from "./PrivateRouter";
import PublicRoute from "./PublicRoute";
import registerProfile from "./registerProfile";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rota pública */}
                <Route path="/" element={<PublicRoute Component={Login} />} />

                {/* Rotas privadas */}
                <Route path="/Home" element={<PrivateRoute Component={Home} />} />
                <Route path="/registerUser" element={<PrivateRoute Component={registerUser} />} />
                <Route path="/registerSetor" element={<PrivateRoute Component={RegisterSetor} />} />
                <Route path="/registerEvents" element={<PrivateRoute Component={registerEvents} />} />
                <Route path="/registerProfile" element={<PrivateRoute Component={registerProfile}/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;