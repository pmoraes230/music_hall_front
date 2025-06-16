import React from "react";
import PrivateRoute from "./PrivateRouter";
import PublicRoute from "./PublicRoute";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./login";
import registerUser from "./registerUser";
import { Home } from "./Home/Home";
import RegisterSetor from "./registerSetor";
import registerEvents from "./registerEvents";
import registerProfile from "./registerProfile";
import upUser from "./upUser";
import assentsEvents from "./assentos";

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
                <Route path="/upUser" element={<PrivateRoute Component={upUser}/>}/>
                <Route path="/assentos" element={<PrivateRoute Component={assentsEvents}/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;