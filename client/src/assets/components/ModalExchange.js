import {Box, Button, IconButton, Modal} from "@mui/material";
import {BASE_API_URL} from "../../constants/apiRoutes";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import React, {useContext, useEffect, useRef, useState} from "react";
import {TrainerContext, UserContext} from "../../index";
import {DataContext} from "../../pages/home";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

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


const ModalExchange = ({ open, handleClose, exchangeState }) => {
    const [userData, _, setRefresh] = useContext(UserContext);
    const { selectedPokemon, handlePokemonSelected } = useContext(DataContext);
    const trainers = useContext(TrainerContext);

    const [exchangeList, setExchangeList] = exchangeState;

    const [offeredPokemon, setOfferedPokemon] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);

    const [buttonOK, setbuttonOK] = useState(true);

    const handleCloseExchange = () => {
        handleClose();
        setbuttonOK(true);
        if (window.exchangeSocket) {
            console.log("Cerrando websocket exchange")
            window.exchangeSocket.close();
        }
    };



    useEffect(() => {
        if (open) {
            const socket = new WebSocket('ws://localhost:4000/exchangelist');
            window.exchangeSocket = socket;

            console.log(userData);

            socket.onopen = function(e) {
                socket.send(
                    JSON.stringify({
                        state: 'connected',
                        pokemonExchange: selectedPokemon,
                        trainerAvatar: userData.trainerAvatar,
                        name: userData.name,
                    })
                );
            };

            socket.onmessage = function(event) {
                const messageData = JSON.parse(event.data);
                console.log('recibido: ', messageData);
                switch (messageData.state) {
                    case 'connectionOK': {
                        console.log('Conexion existosa');
                        break;
                    }
                    case 'exchangeList': {
                        console.log('Recibida lista intercambio', messageData.body);
                        setExchangeList(messageData.body);
                        break;
                    }
                    case 'newExchangeUser': {
                        setExchangeList((prevValue) => {
                            return [...prevValue, messageData.body];
                        });
                        break;
                    }
                    case 'requestExchange':{
                        console.log("pokemon oferta", messageData.body);
                        setOfferedPokemon(messageData.body);
                        break
                    }
                    case 'exchangeClose':{
                        setOfferedPokemon(null);
                        setModalOpen(false);
                        break
                    }
                    case 'OKExchange':{
                        setOfferedPokemon(null);
                        setModalOpen(false);
                        setbuttonOK(true);
                        setRefresh(true);
                        handlePokemonSelected(null);
                        handleCloseExchange();
                        break;
                    }
                    case 'addFriend':{
                        console.log("te quieren anadir" , messageData.body);
                    }
                    case 'addFriendClose':{
                        console.log("anadir amigo cancelado");
                    }
                }
            };
        }
    }, [open]);

    const handleExchange = (clickedExchange) =>{

        window.exchangeSocket.send(
            JSON.stringify(
                {
                        state: 'exchange',
                        body: clickedExchange
            })
        );
        setOfferedPokemon(clickedExchange);
        setbuttonOK(false);
    }

    const handleCloseOKExchange = () => {
        window.exchangeSocket.send(
            JSON.stringify(
                {
                    state: 'exchangeClose',
                    body: offeredPokemon.pokemonExchange,
                })
        );
        setbuttonOK(true);
        setOfferedPokemon(null);
        setModalOpen(false);
    };

    const handleOKExchange = () => {
        window.exchangeSocket.send(
            JSON.stringify(
                {
                    state: 'OKExchange',
                    body: offeredPokemon.pokemonExchange,
                })
        );
    };

    const handleAddFriend = (friend) =>{
        window.exchangeSocket.send(
            JSON.stringify(
                {
                    state: 'addFriend',
                    body: friend
                })
        );
    }



    return(
        <>
            <Modal
                open={open}
                onClose={handleCloseExchange}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <h3>Intercambio</h3>
                    <div className="container-exchange">
                        <img
                            className={"gif-exchange"}
                            src={selectedPokemon.species.imgGif}
                            alt={selectedPokemon.species.name}
                        />

                        <img className="img-exchange"
                             src={`${BASE_API_URL}/public/images/generic/exchange.png`}
                             alt="Imagen intercambio"
                        />
                        <div className="box-exchange">
                            {console.log(exchangeList.length)}
                            {
                                exchangeList.length > 0 ?
                                    exchangeList.map((e, i) => {
                                        console.log(e.pokemonExchange._id.toString());
                                        return (
                                        <div className="trainer-exchange" key={e.pokemonExchange._id.toString()}>
                                            <img
                                                className="gif2-exchange"
                                                src={e.pokemonExchange.species.imgGif}
                                                alt={e.pokemonExchange.species.name}
                                            />
                                            <div
                                                className="trainer-image-exchange"
                                                style={{
                                                    backgroundImage: `url("${BASE_API_URL}/public/images/trainer/${trainers[e.trainerAvatar].name}.png")`,
                                                }}
                                            ></div>
                                            <span className="hubText">
                                                {e.name}
                                            </span>

                                            <IconButton color="secondary" aria-label="anadir a amigos" onClick={() => handleAddFriend(e)}>
                                                <PersonAddIcon />
                                            </IconButton >

                                            <IconButton color="primary" aria-label="Confirmar Intercambio" onClick={() => handleExchange(e)}>
                                                <PublishedWithChangesIcon />
                                            </IconButton>
                                        </div>
                                    )})
                                    : (<div className="trainer-exchange">no hay pokemons para intercambiar</div>)
                            }
                        </div>
                    </div>


                    <div>
                        <Button
                            color="error"
                            size="small"
                            variant="contained"
                            endIcon={<DoDisturbIcon />}
                            sx={{ margin: 2 }}
                            onClick={handleCloseExchange}
                        >
                            cancelar
                        </Button>
                    </div>
                </Box>
            </Modal>
            <Modal
                open={offeredPokemon !== null}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={"modal-exchange"} >
                    {offeredPokemon === null ? ( <h1>Intercambio</h1> )
                        : (
                            <>
                                <h5>Conformar intercambio</h5>

                                <div className="img-exchange-modal">
                                    <div className="gif3-exchange-left ">
                                        <img
                                            src={selectedPokemon.species.imgGif}
                                            alt={selectedPokemon.species.name}
                                        />
                                    </div>

                                    <img className="img-exchange-intercambio"
                                         src={`${BASE_API_URL}/public/images/generic/exchange.png`}
                                         alt="Imagen intercambio"
                                    />
                                    <div className="gif3-exchange-right" >
                                        <img
                                            src={offeredPokemon.pokemonExchange.species.imgGif}
                                            alt={offeredPokemon.pokemonExchange.species.name}
                                        />
                                    </div>

                                </div>
                                <div>
                                    <Button
                                        color="error"
                                        size="small"
                                        variant="contained"
                                        endIcon={<DoDisturbIcon />}
                                        sx={{ margin: 2 }}
                                        onClick={handleCloseOKExchange}
                                    >
                                        cancelar
                                    </Button>
                                    {!buttonOK ? <></> : (
                                        <Button
                                        color="success"
                                        size="small"
                                        variant="contained"
                                        endIcon={<TaskAltIcon />}
                                        sx={{ margin: 2 }}
                                        onClick={handleOKExchange}
                                    >
                                        Confirmar
                                    </Button>)}
                                </div>
                            </>
                        )}
                </Box>
            </Modal>
        </>
    );

}
export default ModalExchange;
