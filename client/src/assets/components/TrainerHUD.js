import {useContext, useState} from "react";
import {TrainerContext, UserContext} from "../../index";
import {BASE_API_URL} from "../../constants/apiRoutes";
import * as React from "react";
import '../../assets/styles/TrainerHUD.css';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@mui/icons-material/Settings';
import {Box, Button, FormControl, IconButton, MenuItem, Modal, TextField} from "@mui/material";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import TrainerSelector from "./TrainerSelector";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import axios from "axios";
import AlertMessage from "./AlertMessage";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '4px',
    border: 'none !important',
    outline: 'none',
    padding: '20px'
};


const TrainerHUD = () => {

    const [user, setUserData,setRefresh ] = useContext(UserContext);
    const trainers = useContext(TrainerContext);
    const navigate = useNavigate();
    const [openModalConfig, setOpenModalConfig] = React.useState(false);
    const [error, setError] = useState('');
    const [ok, setOk] = useState('');

    const formatFecha = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [formData, setFormData] = useState({
        name: user.name,
        birthDate: formatFecha(user.birthDate),
        email: user.email,
        password: '',
        newPassword: '',
        trainerAvatar: ''
    });
    const logout = () => {
        if (Cookies.get('token')) {
            Cookies.remove('token');
            setUserData(null);
        }
        window.closeFriendSocket();
        navigate("../login")

    };
    const home = () => {
        navigate("../home")
    };
    const handleOpenConfig = () => {
        setOpenModalConfig(true);
    }
    const handleCloseConfig = () => {
        setOpenModalConfig(false);
        setError('');
        setOk('');
        setFormData({ ...formData, password: ''});
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTrainerChange = (trainerName) => {
        setFormData({ ...formData, trainerAvatar: trainerName });
    };

    const handleSubmitPerfil = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                BASE_API_URL + '/editperfil',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('token')}`,
                    },
                }
            ).then(() => {
                setRefresh(true);
                setOk('ok');
                setTimeout(() => {
                    handleCloseConfig();
                }, 1000);
            });
        } catch (error) {
            setError('Error');
            console.error('Error:', error);
        }
    };

    return (
        <div className={"hud"}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                <div
                    className="trainer-image"
                    style={{
                        backgroundImage: `url("${BASE_API_URL}/public/images/trainer/${trainers[(user.trainerAvatar)-1].name}.png")`,
                    }}
                ></div>
                <p
                    className='hubText'
                >{user.name}</p>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly'
            }}>
                <div className="trainer-coin">
                    <img
                        className="poke-coin"
                        src={`${BASE_API_URL}/public/images/generic/pokeCoin.png`}
                        alt={"Poke Coin"}/>
                    <p>{user.coin}</p>
                </div>
                <IconButton onClick={home}
                            style={{ color: '#2e2e2e' }}>
                    <HomeIcon />
                </IconButton >
                <SettingsIcon style={{ color: '#2e2e2e' }} onClick={handleOpenConfig}/>
                <IconButton onClick={logout}
                            style={{ color: '#2e2e2e' }}>
                    <PowerSettingsNewIcon />
                </IconButton>
            </div>
            <Modal
                open={openModalConfig}
                onClose={handleCloseConfig}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={"modal-sell"} >
                    <h3>Editar perfil</h3>
                    <FormControl variant="standard">
                        <TextField
                            id="name"
                            name="name"
                            label="¿Cómo te llamas?"
                            variant="outlined"
                            autoComplete="current-password"
                            defaultValue={user.name}
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
                            defaultValue={formatFecha(user.birthDate)}
                            onChange={handleChange}
                        />
                        <TextField
                            label="correo"
                            name="email"
                            type="email"
                            autoComplete="email"
                            variant="outlined"
                            defaultValue={user.email}
                            sx={{ marginBottom: 3 }}
                            onChange={handleChange}
                        />
                        <TextField
                            error={!!error}
                            id="outlined-password-input"
                            name="password"
                            label="Contraseña Actual"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            sx={{ marginBottom: 3 }}
                            onChange={handleChange}
                        />
                        <TextField
                            id="outlined-newPassword-input"
                            name="newPassword"
                            label="Nueva Contraseña"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            sx={{ marginBottom: 3 }}
                            onChange={handleChange}
                        />
                        <TrainerSelector initialValue={user.trainerAvatar} onTrainerChange={handleTrainerChange} />
                        <Button
                            variant="contained"
                            endIcon={<SaveOutlinedIcon />}
                            sx={{ margin: 2 }}
                            onClick={handleSubmitPerfil}
                        >
                            guardar
                        </Button>
                    </FormControl>
                    {error && (
                        <AlertMessage mensaje={'Error de contrañsena'} tipo={'error'} />
                    )}
                    {ok && (
                        <AlertMessage mensaje={'Perfil actualizados'} tipo={''} />
                    )}
                </Box>
            </Modal>
        </div>
    );
}
export default TrainerHUD;