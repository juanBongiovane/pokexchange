import {Alert, Box, Button, Fade, IconButton, Modal} from "@mui/material";
import * as React from "react";
import {pokemonTypeBox, pokemonTypeString} from "../../utils/pokemonType";
import {BASE_API_URL} from "../../constants/apiRoutes";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {useContext, useState} from "react";
import {UserContext} from "../../index";
import axios from "axios";
import Cookies from "js-cookie";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '4px',
    border: 'none !important',
    outline: 'none'
};

const ModalShop = ({ open, onClose, pokemon }) => {

    const [userData, _, setRefresh] = useContext(UserContext);
    const token = Cookies.get('token');
    const [pokemonCount, setPokemonCount] = useState(1)
    const handleClose = () => {
        onClose();
    };

    const fetchBuyPokemon = async () => {
        const buy = {id:pokemon._id, count: pokemonCount};
        try {
            const response = await axios.post(
                BASE_API_URL + '/buypokemon',
                { buy },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            ).then(() => {
                setRefresh(true);
                onClose();
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <Box sx={style}>
                    <div className="modal-container">
                        <div className={"imgGif-pokemon"}>
                            <img src={pokemon.imgGif} alt={pokemon.name} />
                        </div>
                        <div className={"pokemon-info"}>
                            <h3>N.º {pokemon._id} - {pokemon.name} </h3>

                            {pokemon.types.map((type, i) => (
                                <img
                                    key={i+91}
                                    src={pokemonTypeBox(type).url}
                                    alt={pokemonTypeBox(type).name}
                                />
                            ))}
                        </div>
                        <div className={"contPokemon-container"}>
                            <IconButton aria-label="menos" size="large" onClick={pokemonCount === 1 ? null : () => setPokemonCount(pokemonCount - 1)}>
                                <RemoveIcon fontSize="inherit" />
                            </IconButton>
                            <div>
                                <h4>{pokemonCount}</h4>
                            </div>
                            <IconButton aria-label="mas" size="large" onClick={pokemonCount === 10 ? null : () => setPokemonCount(pokemonCount + 1)}>
                                <AddIcon fontSize="inherit"  />
                            </IconButton>
                        </div>
                        {userData.coin < (pokemon.price * pokemonCount) ? (
                        <Alert className={"alert-saldo"} variant="filled" severity="error" >
                            Saldo ₽ pokedólar insuficiente
                        </Alert>) : (<></>)}
                        <div className={"modal-buton"}>
                            <Button size="small" color="error" onClick={handleClose}>
                                cancelar
                            </Button>
                            <Button className={userData.coin < (pokemon.price * pokemonCount) ? "disabled-card-coin": "card-coin"} disabled={userData.coin < (pokemon.price * pokemonCount)} onClick={fetchBuyPokemon}>
                                <img
                                    className="pokeCard-coin"
                                    src={`${BASE_API_URL}/public/images/generic/pokeCoin.png`}
                                    alt={"Poke Coin"}
                                />
                                <p>{pokemon.price*pokemonCount}</p>
                            </Button>
                        </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ModalShop;
