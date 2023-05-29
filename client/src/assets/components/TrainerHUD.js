import {useContext, useState} from "react";
import {TrainerContext, UserContext} from "../../index";
import {BASE_API_URL} from "../../constants/apiRoutes";
import * as React from "react";
import '../../assets/styles/TrainerHUD.css';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@mui/icons-material/Settings';
import {Box, Button, IconButton, MenuItem, Modal, TextField} from "@mui/material";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import TrainerSelector from "./TrainerSelector";

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

    const [user, setUserData] = useContext(UserContext);
    const trainers = useContext(TrainerContext);
    const navigate = useNavigate();
    const [openModalConfig, setOpenModalConfig] = React.useState(false);

    const logout = () => {
        if (Cookies.get('token')) {
            Cookies.remove('token');
            setUserData(null);
        }
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
    };

    const [formData, setFormData] = useState({
        name: user.name,
        birthDate: user.birthDate,
        email: user.email,
        password: user.password,
        trainerAvatar: ''
    });

    const handleTrainerChange = (trainerName) => {
        setFormData({ ...formData, trainerAvatar: trainerName });
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
                    <h3>Modal configuracion</h3>

                    <TrainerSelector initialValue={user.trainerAvatar} onTrainerChange={handleTrainerChange} />
                </Box>
            </Modal>
        </div>
    );
}
export default TrainerHUD;