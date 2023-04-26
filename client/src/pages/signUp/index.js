import React from 'react';
import SignUpForm from "./signUpForm";
import {Box, Container} from "@mui/material";

import '../../assets/styles/index.css';

function SignUp() {
    return (
        <Container maxWidth={false}
                   sx={{ height: '100vh', padding: 0}}
                   className="no-padding-container"
        >
            <Box sx={{ bgcolor: '#cfe8fc', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{
                    borderRadius: '8px',
                    padding: '32px',
                    backgroundColor: '#fff',
                    minWidth: '300px',
                    maxWidth: '100%',
                    boxShadow: 3
                }}>
                    <SignUpForm />
                </Box>
            </Box>
        </Container>
    );
}
export default SignUp;