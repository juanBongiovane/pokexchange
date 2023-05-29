import React, {useContext, useEffect, useState} from "react";
import {DataContext} from "./index";
import {getStages} from "../../utils/pokemonStages";
import '../../assets/styles/pokemonView.css'
import {toUpperCase} from "../../utils/toUpperCase";
import {BASE_API_URL} from "../../constants/apiRoutes";
import {Box, Button, MenuItem, Modal, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField} from "@mui/material";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import EditNoteIcon from '@mui/icons-material/EditNote';
import {pokemonTypeBox, pokemonTypeString} from "../../utils/pokemonType";
import axios from "axios";
import {UserContext} from "../../index";
import Cookies from "js-cookie";
import {runInContext as currencies} from "lodash";

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


const PokemonView = () => {


    const [userData, _, setRefresh] = useContext(UserContext);

    const { selectedPokemon, handlePokemonSelected } = useContext(DataContext);

    const token = Cookies.get('token');

    const [openModalEdit, setOpenModalEdit] = React.useState(false);
    const [openModalSell, setOpenModalSell] = React.useState(false);
    const [savePokemon, setSavePokemon] = useState({name:"", id:"", box:0});

    const handleOpenEdit = () => {
        setOpenModalEdit(true);
        setSavePokemon({...savePokemon, box: 0});
    }
    const handleOpenSell = () => {
        setOpenModalSell(true);
    }
    const handleClose = () => {
        setOpenModalSell(false);
        setOpenModalEdit(false);
    }

    const actions = [
        { icon: <CurrencyExchangeIcon onClick={handleOpenSell} />, name: 'vender' },
        { icon: <ShuffleIcon />, name: 'intercambiar' },
        { icon: <EditNoteIcon onClick={handleOpenEdit}/>, name: 'editar pokemon' },
    ];

    const fetchSellPokemon = async () => {
        const buy = selectedPokemon._id;
        try {
            const response = await axios.post(
                BASE_API_URL + '/sellpokemon',
                { id: buy },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            ).then(() => {
                setRefresh(true);
                handleClose();
                handlePokemonSelected("");
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchSavePokemon = async () => {
        try {
            const response = await axios.post(
                BASE_API_URL + '/savepokemon',
                savePokemon,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            ).then(() => {
                setRefresh(true);
                handleClose();
                handlePokemonSelected("");
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        if(selectedPokemon && selectedPokemon.name !=='Pokemon Empty'){
            setSavePokemon({ ...savePokemon, name: selectedPokemon.name, id: selectedPokemon._id })
        }
    }, [selectedPokemon]);

    return (
        <div className="pokemon-view">
            {selectedPokemon && selectedPokemon.name !=='Pokemon Empty' ? (
                <>
                    <Box>
                        <SpeedDial
                            ariaLabel="SpeedDial basic example"
                            sx={{ position: 'absolute', bottom: 16, right: 16 }}
                            icon={<SpeedDialIcon />}
                        >
                            {actions.map((action) => (
                                <SpeedDialAction
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                />
                            ))}
                        </SpeedDial>
                    </Box>
                    <span className="text-view">{selectedPokemon.species._id}</span>
                    <div>
                        <img
                            src={selectedPokemon.species.img}
                            alt={selectedPokemon.species.name}
                        />
                    </div>
                    <div className="pokemon-data">
                        <span>{toUpperCase(selectedPokemon.species.name)}</span>
                        <div>
                            <span>Nº {selectedPokemon.species._id} -&ensp;&ensp;</span>
                            <span> "{selectedPokemon.name}"</span>
                        </div>
                        <div>
                            <span>Nivel: {selectedPokemon.level} -&ensp;&ensp;</span>
                            <span> {getStages(selectedPokemon.species.stages)}</span>
                        </div>
                        <div>
                            {selectedPokemon.species.types.map((type, i) => (
                                <img
                                    key={i+91}
                                    src={pokemonTypeString(type).url}
                                    alt={pokemonTypeString(type).name}
                                />
                            ))}
                        </div>
                    </div>
                    <Modal
                        open={openModalSell}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} className={"modal-sell"} >
                            <h3>Esta seguro que desea vender el pokemon ?</h3>
                            <div className={"imgGif-pokemon"}>
                                <img src={selectedPokemon.species.imgGif} alt={selectedPokemon.species.name} />
                            </div>
                            <div className={"pokemon-info"}>
                                <h3>N.º {selectedPokemon.species._id} - {toUpperCase(selectedPokemon.species.name)} </h3>

                                {selectedPokemon.species.types.map((type, i) => (
                                    <img
                                        key={i+91}
                                        src={pokemonTypeBox(type).url}
                                        alt={pokemonTypeBox(type).name}
                                    />
                                ))}
                            </div>
                            <div className={"modal-button"}>
                                <Button size="small" color="error" onClick={handleClose}>
                                    cancelar
                                </Button>
                                <Button onClick={fetchSellPokemon}>
                                    <img
                                        className="pokeCard-coin"
                                        src={`${BASE_API_URL}/public/images/generic/pokeCoin.png`}
                                        alt={"Poke Coin"}
                                    />
                                    <p>{Math.round((selectedPokemon.species.price)-(selectedPokemon.species.price*0.3))}</p>
                                </Button>
                            </div>
                        </Box>
                    </Modal>
                    <Modal
                        open={openModalEdit}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} className={"modal-sell"} >
                            <h3>Editar Pokemon</h3>
                            <div className={"imgGif-pokemon"}>
                                <img src={selectedPokemon.species.imgGif} alt={selectedPokemon.species.name} />
                            </div>
                            <div className={"pokemon-info"}>
                                <h3>N.º {selectedPokemon.species._id} - {toUpperCase(selectedPokemon.species.name)} </h3>

                                {selectedPokemon.species.types.map((type, i) => (
                                    <img
                                        key={i+91}
                                        src={pokemonTypeBox(type).url}
                                        alt={pokemonTypeBox(type).name}
                                    />
                                ))}
                            </div>
                            <div className={"input-Modal"}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Nombre"
                                    multiline
                                    defaultValue={selectedPokemon.name}
                                    onChange={(event) => setSavePokemon({ ...savePokemon, name: event.target.value })}
                                />
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Box"
                                    defaultValue={0}
                                    onChange={(event) => setSavePokemon({ ...savePokemon, box: event.target.value })}
                                >
                                    {userData.boxes.map((box, i) => (
                                        <MenuItem key={i+65} value={i} >
                                            {box.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>


                            <div className={"modal-button-edit"}>
                                <Button size="small" color="error" onClick={handleClose}>
                                    cancelar
                                </Button>
                                <Button size="small" color="success" onClick={fetchSavePokemon}>
                                    guardar
                                </Button>
                            </div>
                        </Box>
                    </Modal>
                </>
                ) : (
                <div className="pokemon-empty">
                    <img
                        src={`${BASE_API_URL}/public/images/generic/pokeball.png`}
                        alt="Seleccione un Pokemon"
                    />
                    <span className="text-view">Seleccione un pokemon de la caja</span>
                </div>

                )}
        </div>
    );
};

export default PokemonView;