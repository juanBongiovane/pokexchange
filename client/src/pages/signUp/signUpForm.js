import '../../assets/styles/signUpForm.css';

import React, { useState } from 'react';
import {Button, FormControl, TextField, Typography} from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import TrainerSelector from '../../assets/components/TrainerSelector';
import {USER_API_POST_URL} from '../../constants/apiRoutes'



const SignUpForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        birthDate: '',
        email: '',
        password: '',
        trainerAvatar: null
    });

    const handleTrainerChange = (trainerName) => {
        setFormData({ ...formData, trainerAvatar: trainerName });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        console.log(formData);
        const response =  fetch(USER_API_POST_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then( async response=>{
            if (response.ok) {
                console.log("enviado");
            } else {
                throw new Error(await response.text());
            }
        }).catch(error=>{
            console.log(error);
        })
    };

    return (
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
    );
};

export default SignUpForm;