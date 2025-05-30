import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./login";
import registerUser from "./registerUser";
import { Home } from "./Home/Home";
import RegisterSetor from "./registerSetor";
import registerEvents from "./registerEvents";

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route Component={Login} path="/" exact/>
                <Route Component={Home} path="/Home"/>
                <Route Component={registerUser} path="/registerUser"/>
                <Route Component={RegisterSetor} path="/registerSetor"/>
                <Route Component={registerEvents} path="/registerEvents"/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router