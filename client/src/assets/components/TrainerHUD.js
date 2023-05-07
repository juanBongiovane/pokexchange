import {useContext} from "react";
import {TrainerContext, UserContext} from "../../index";
import {BASE_API_URL} from "../../constants/apiRoutes";
import * as React from "react";
import '../../assets/styles/TrainerHUD.css';


const TrainerHUD = ({}) =>{

    const [user, _] = useContext(UserContext);
    const trainers = useContext(TrainerContext);

    return (
        <div
        className={"hud"}>
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
                <p>{user.name}</p>
            </div>
            <div style={{ display: 'flex' }}>
                <div className="trainer-coin">
                    <img
                        className="poke-coin"
                        src={`${BASE_API_URL}/public/images/generic/pokeCoin.png`}
                        alt={"Poke Coin"}/>
                    <p>200</p>
                </div>
            </div>
        </div>

    );
}
export default TrainerHUD;