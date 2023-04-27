import React from 'react';
import LoginForm from "./LoginForm";
import {Box, Container} from "@mui/material";
import SignUpForm from "../signUp/signUpForm";
import AppBackground from "../../assets/components/AppBackground";

function LoginPage() {
    return (
        <AppBackground>
            <LoginForm />
        </AppBackground>
    );
}
export default LoginPage;