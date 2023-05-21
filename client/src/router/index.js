import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import LoginPage from '../pages/LoginPage/LoginPage';
import HomePage from '../pages/home';
import SignUp from '../pages/signUp/signUp';
import Cookies from 'js-cookie';
import ShopPage from "../pages/home/ShopPage";

const isAuthenticate = (e) => {
    const token = Cookies.get('token');
    if (token !== undefined && token != null && token !== "") return e;
    return <LoginPage />;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={isAuthenticate(<HomePage />)} />
                <Route path="/home" element={isAuthenticate(<HomePage />)} />
                <Route path="/shop" element={isAuthenticate(<ShopPage />)} />
                <Route path="/login" element={isAuthenticate(<HomePage />)} />
                <Route path="/signUp" element={<SignUp />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;