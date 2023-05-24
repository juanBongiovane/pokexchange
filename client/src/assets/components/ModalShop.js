import {Backdrop, Box, Fade, Modal, Typography} from "@mui/material";
import * as React from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '15px'
};

const ModalShop = ({ open, onClose, pokemon }) => {

    const handleClose = () => {
        onClose();
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <div className="modal-container">
                        <h2>Comprar Pokémon</h2>
                        <p>Estás a punto de comprar el siguiente Pokémon:</p>
                        <div className="pokemon-details">
                            <img src={pokemon.imgGif} alt={pokemon.name} />
                            <div className="pokemon-info">
                                <p><strong>Nombre:</strong> {pokemon.name}</p>
                                <p><strong>Tipo:</strong> {pokemon.types}</p>
                                <p><strong>Precio:</strong> {pokemon.price}</p>
                            </div>
                        </div>
                        <button >Comprar</button>
                        <button onClick={handleClose}>Cancelar</button>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ModalShop;
