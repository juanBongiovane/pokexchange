import React, { useState } from 'react';
import '../../assets/styles/loginForm.css';
import {Box, InputAdornment, TextField} from "@mui/material";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes procesar el inicio de sesión con las credenciales ingresadas
        console.log('Username:', username, 'Password:', password);
    };

    return (
        <div className="login-form-container">
            <h1>Iniciar sesión</h1>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountBoxOutlinedIcon sx={{ color: '#558b2f', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="Username" variant="standard" color="secondary"/>
            </Box>
        </div>
    );
};

export default LoginForm;