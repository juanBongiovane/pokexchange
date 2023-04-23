import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import React from "react";
import LoginPage from "../pages/LoginPage";


const routes =  createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    }, {
        path: "/login",
        element: <LoginPage/>,
    }]);

export default routes;