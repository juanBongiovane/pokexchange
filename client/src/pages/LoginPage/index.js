import React from 'react';
import LoginForm from "./LoginForm";
import {Box, Container} from "@mui/material";

function LoginPage() {
    return (
        <Container maxWidth={false}
                   sx={{ bgcolor: 'red', height: '100vh' }}
        >
            <Box sx={{ bgcolor: '#cfe8fc', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{
                    border: '2px solid #000',
                    borderRadius: '8px',
                    padding: '32px',
                    backgroundColor: '#fff',
                    minWidth: '300px',
                    maxWidth: '100%',
                }}>
                    <LoginForm />
                </Box>
            </Box>
        </Container>
    );
}
export default LoginPage;