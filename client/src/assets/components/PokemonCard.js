import * as React from "react";
import '../../assets/styles/PokemonShop.css';
import {
    Box,
    Card,
    CardContent,
    CardMedia,  Skeleton,
    Typography
} from "@mui/material";
import {BASE_API_URL} from "../../constants/apiRoutes";
import {useState} from "react";
import ModalShop from "./ModalShop";

const PokemonCard = ({ my, pokemon }) => {

    const [openModal, setOpenModal] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    if (pokemon !== "null") {
        return (
            <Card
                sx={{
                    width: "150px",
                    height: "250px",
                    display: "flex",
                    flexDirection: "column",
                    margin: "5px",
                }}
            >
                <div style={{ visibility: my ? 'visible' : 'hidden'  }} className={"myPokeomn"} ><span>&#10024;</span> </div>
                {!imageLoaded && <Skeleton animation="pulse" variant="rounded" width={160} height={150} />}
                <CardMedia
                    component="img"
                    image={pokemon.img}
                    title={pokemon.name}
                    onLoad={handleImageLoad}
                    sx={{ display: imageLoaded ? 'initial' : 'none' }}
                />
                <CardContent
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "6px 6px !important",
                        margin: "10px 15px 0 15px"
                    }}
                >
                    <Typography variant="body2" className="pokeCard-text" noWrap>
                        {pokemon.name}
                    </Typography>
                    <Box className="card-coin" onClick={handleOpenModal}>
                        <img
                            className="pokeCard-coin"
                            src={`${BASE_API_URL}/public/images/generic/pokeCoin.png`}
                            alt={"Poke Coin"}
                        />
                        <p>{pokemon.price}</p>
                    </Box>
                </CardContent>
                <span className={"pokemonNumber"}>{pokemon._id}</span>
                <ModalShop open={openModal} onClose={handleCloseModal} pokemon={pokemon} />
            </Card>
        );
    } else {
        return (
            <Card
                sx={{
                    width: "150px",
                    height: "250px",
                    display: "flex",
                    flexDirection: "column",
                    margin: "5px",
                }}
            >
                <CardMedia component="img" image={`${BASE_API_URL}/public/images/generic/empty-shop.jpg`} title={'Empty'} style={{ opacity: 0.4 }} />
            </Card>
        );
    }
};

export default PokemonCard;
