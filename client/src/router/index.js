import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import LoginPage from '../pages/LoginPage/LoginPage';
import HomePage from '../pages/home';
import SignUp from '../pages/signUp/signUp';
import Cookies from 'js-cookie';
import ShopPage from "../pages/home/ShopPage";

const isAuthenticate = (e) => {
    if (Cookies.get('token')) return e;
    return <Navigate to="/login" />;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/home" element={isAuthenticate(<HomePage />)} />
                <Route path="/shop" element={isAuthenticate(<ShopPage />)} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signUp" element={<SignUp />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;