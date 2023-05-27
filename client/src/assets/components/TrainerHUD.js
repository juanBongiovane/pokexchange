import {useContext} from "react";
import {TrainerContext, UserContext} from "../../index";
import {BASE_API_URL} from "../../constants/apiRoutes";
import * as React from "react";
import '../../assets/styles/TrainerHUD.css';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@mui/icons-material/Settings';
import {IconButton, Link} from "@mui/material";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';


const TrainerHUD = () => {

    const [user, setUserData] = useContext(UserContext);
    const trainers = useContext(TrainerContext);
    const navigate = useNavigate();

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
                </IconButton>
                <SettingsIcon style={{ color: '#2e2e2e' }} />
                <IconButton onClick={logout}
                            style={{ color: '#2e2e2e' }}>
                    <PowerSettingsNewIcon />
                </IconButton>

            </div>
        </div>
    );
}
export default TrainerHUD;