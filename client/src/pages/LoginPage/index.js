import React from 'react';
import LoginForm from "./LoginForm";
import {Box, Container} from "@mui/material";

function LoginPage() {
    return (
        <Container m={0} sx={{ bgcolor: 'red', height: '100vh' }} maxWidth={false}>
            <Box sx={{ bgcolor: '#cfe8fc', height: '100%' }}>
                <LoginForm/>
            </Box>
        </Container>

    );
}
export default LoginPage;