import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./login";
import registerUser from "./registerUser";

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route Component={Login} path="/" exact/>
                <Route Component={registerUser} path="/registerUser"/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router