import '../../assets/styles/signUpForm.css';
import React, { useState } from 'react';
import {Box, Button, FormControl, TextField, Typography} from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import TrainerSelector from '../../assets/components/TrainerSelector';
import {BASE_API_URL} from '../../constants/apiRoutes'
import AppBackground from "../../assets/components/AppBackground";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const SignUp = () => {
    const navigateLogin = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        birthDate: '',
        email: '',
        password: '',
        trainerAvatar: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTrainerChange = (trainerName) => {
        setFormData({ ...formData, trainerAvatar: trainerName });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response= await axios.post(BASE_API_URL+'/api/auth/register', formData);
            Cookies.set('token', response.data);
            navigateLogin("../home");
        } catch (err) {
            alert('Failed to register user');
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
                boxShadow: 3
            }}>
                <div className="signUp-form">
                    <Typography
                        variant="h5"
                        sx={{ marginBottom: 3 }}
                    >Únete a la aventura:
                    </Typography>

                    <FormControl variant="standard">
                        <TextField
                            id="name"
                            name="name"
                            label="¿Cómo te llamas?"
                            variant="outlined"
                            autoComplete="current-password"
                            sx={{ marginBottom: 3 }}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Fecha de nacimiento"
                            name="birthDate"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            sx={{ marginBottom: 3 }}
                            onChange={handleChange}
                        />
                        <TextField
                            label="¿Cuál es tu correo?"
                            name="email"
                            type="email"
                            autoComplete="email"
                            variant="outlined"
                            sx={{ marginBottom: 3 }}
                            onChange={handleChange}
                        />
                        <TextField
                            id="outlined-password-input"
                            name="password"
                            label="Contraseña"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            sx={{ marginBottom: 3 }}
                            onChange={handleChange}
                        />
                        <TrainerSelector onTrainerChange={handleTrainerChange} />
                    </FormControl>
                    <Button
                        variant="contained"
                        endIcon={<SaveOutlinedIcon />}
                        sx={{ margin: 2 }}
                        onClick={handleSubmit}
                    >
                        Crear Cuenta
                    </Button>
                </div>
            </Box>
        </AppBackground>
    );
};
export default SignUp;