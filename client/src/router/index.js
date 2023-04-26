import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import React from "react";
import LoginPage from "../pages/LoginPage";
import SignUp from "../pages/signUp";


const routes =  createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    }, {
        path: "/login",
        element: <LoginPage/>,
    },{
        path: "/signUp",
        element: <SignUp/>,
    }]);

export default routes;