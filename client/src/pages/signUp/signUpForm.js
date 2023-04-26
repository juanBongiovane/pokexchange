import '../../assets/styles/loginForm.css';

import React, { useState } from 'react';
import {Button, Grid, Link, Select, TextField} from "@mui/material";
import PersonAddSharpIcon from '@mui/icons-material/PersonAddSharp';
import TrainerSelector from '../../assets/components/TrainerSelector';


const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes procesar el inicio de sesión con las credenciales ingresadas
        console.log('Username:', username, 'Password:', password);
    };

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{ height: '100%' }}
        >
            <Grid item>
                <h1>Nuevo usuario</h1>
            </Grid>
            <Grid item sx={{width: "100%"}}>
                <TextField
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    autoComplete="current-password"
                    fullWidth
                    p={0}
                    m={0}
                />
            </Grid>
            <Grid item sx={{width: "100%"}}>
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    fullWidth
                />
            </Grid>
            <Grid item container justifyContent="flex-end">
                <Button
                    variant="contained"
                    endIcon={<PersonAddSharpIcon />}
                    sx={{ marginRight: 2 }}
                >
                    Crear
                </Button>
            </Grid>
            <Grid>
                <TrainerSelector/>
            </Grid>
        </Grid>
    );
};

export default SignUpForm;