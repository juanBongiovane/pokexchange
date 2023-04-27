import React from 'react';
import SignUpForm from "./signUpForm";

import '../../assets/styles/index.css';
import AppBackground from "../../assets/components/AppBackground";
import LoginForm from "../LoginPage/LoginForm";
import {Box} from "@mui/material";

function SignUp() {
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
                <SignUpForm/>
            </Box>
        </AppBackground>
    );
}
export default SignUp;