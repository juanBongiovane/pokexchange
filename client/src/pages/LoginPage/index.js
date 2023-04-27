import React from 'react';
import LoginForm from "./LoginForm";
import {Box, Container} from "@mui/material";
import SignUpForm from "../signUp/signUpForm";
import AppBackground from "../../assets/components/AppBackground";

function LoginPage() {
    return (
        <AppBackground>
            <Box sx={{
                borderRadius: '8px',
                padding: '32px',
                backgroundColor: '#fff',
                minWidth: '300px',
                maxWidth: '100%',
                boxShadow: 3
            }}>
                <LoginForm />
            </Box>
        </AppBackground>
    );
}
export default LoginPage;