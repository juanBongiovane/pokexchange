import * as React from "react";
import '../../assets/styles/PokemonShop.css';
import {Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {BASE_API_URL} from "../../constants/apiRoutes";





const PokemonCard = ({pokemon}) => {

    return (
        <Card sx={{ width: 150, display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                image={pokemon.img}
                title={pokemon.name}
            />

            <CardContent sx={{
                            padding: 1,
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                <Typography variant="body2" noWrap>{pokemon.name}</Typography>
                <Typography variant="body2"></Typography>
                <div className="card-coin">
                    <img
                        className="pokeCard-coin"
                        src={`${BASE_API_URL}/public/images/generic/pokeCoin.png`}
                        alt={"Poke Coin"}/>
                    <p>{pokemon.price}</p>
                </div>
                <Button variant="contained"
                        color="primary"
                        size="small"
                >
                    Comprar
                </Button>
            </CardContent>
        </Card>
    );
}
export default PokemonCard;