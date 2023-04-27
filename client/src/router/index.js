import {createBrowserRouter} from "react-router-dom";
import React from "react";
import LoginPage from "../pages/LoginPage";
import SignUp from "../pages/signUp";
import HomePage from "../pages/home";


const routes =  createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
    }, {
        path: "/login",
        element: <LoginPage/>,
    },{
        path: "/signUp",
        element: <SignUp/>,
    }]);

export default routes;