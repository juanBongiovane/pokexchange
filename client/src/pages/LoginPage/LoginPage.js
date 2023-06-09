import '../../assets/styles/loginForm.css';
import React, {useContext, useEffect, useState} from 'react';
import {Alert, Box, Button, Grid, TextField} from "@mui/material";
import PersonAddSharpIcon from '@mui/icons-material/PersonAddSharp';

import AppBackground from "../../assets/components/AppBackground";
import axios from 'axios';
import { BASE_API_URL } from "../../constants/apiRoutes";
import LoginIcon from '@mui/icons-material/Login';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import {UserContext} from "../../index";
import AlertMessage from "../../assets/components/AlertMessage";

const LoginPage = () => {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [userData, setUserData, setRefresh] = useContext(UserContext);

    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(BASE_API_URL + '/api/auth/login', formData, { withCredentials: false });
            Cookies.set('token', response.data);
            setRefresh(true);
        } catch (err) {
            setError('Error al iniciar sesión');
            setTimeout(() => {
                setError('');
            }, 8000);
        }
    };

    const signup = ()=>{
        navigate("../signup");
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <AppBackground>
            <Box sx={{
                borderRadius: '8px',
                padding: '32px',
                backgroundColor: '#fff',
                minWidth: '300px',
                maxWidth: '100%',
                boxShadow: 3,
                margin: 'auto'
            }}>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                    sx={{ height: '100%' }}
                >
                    <Grid item>
                        <h1>Iniciar Sesion</h1>
                    </Grid>
                    <Grid item sx={{ width: "100%" }}>
                        <TextField
                            error={!!error}
                            id="outlined-basic"
                            name="email"
                            label="Username"
                            variant="outlined"
                            autoComplete="current-password"
                            fullWidth
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item sx={{ width: "100%" }}>
                        <TextField
                            error={!!error}
                            id="outlined-password-input"
                            name="password"
                            label="password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            fullWidth
                            value={formData.password}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                        />
                    </Grid>
                    <Grid item container justifyContent="flex-end">
                        <Button
                            variant="contained"
                            endIcon={<PersonAddSharpIcon />}
                            sx={{ marginRight: 2 }}
                            onClick={signup}
                        >
                            Nuevo
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<LoginIcon />}
                            onClick={handleSubmit}
                        >
                            Entrar
                        </Button>
                    </Grid>
                </Grid>
                {error && (
                    <AlertMessage mensaje={'Error de usuario y/o contrañsena'} tipo={'error'} />
                )}
            </Box>
        </AppBackground>
    );
};
export default LoginPage;
