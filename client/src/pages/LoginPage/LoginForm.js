import React, { useState } from 'react';
import '../../assets/styles/loginForm.css';
import {Box, Grid, InputAdornment, TextField} from "@mui/material";
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
        <>
            <Grid container xs display="flex" justifyContent="center" alignItems="center" sx={{height: "100%"}}>
                <Grid item xs={12} container  justifyContent="center" alignItems="center" sx={{height: "50%"}} >
                <h1>Iniciar Sesion</h1>
                </Grid>
                <Grid item xs={12} container  justifyContent="center" alignItems="center" sx={{height: "50%"}}>

                <AccountBoxOutlinedIcon sx={{ color: '#558b2f', mr: 1, my: 0.5 }} />
                <TextField
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    autoComplete="current-password"
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                />
            </Grid>
            </Grid>
        </>
    );
};

export default LoginForm;