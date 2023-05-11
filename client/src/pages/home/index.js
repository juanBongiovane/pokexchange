import React, {useContext, useState} from 'react';

import AppBackground from "../../assets/components/AppBackground";
import PokemonBox from "./PokemonBox";
import TrainerHUD from "../../assets/components/TrainerHUD";
import Carousel from "./CarouselSliderBox";
import PokemonView from "./PokemonView";
import {Grid} from "@mui/material";
import {UserContext} from "../../index";


export const DataContext = React.createContext();


function HomePage() {
    const [loggedUser, _] = useContext(UserContext);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const handlePokemonSelected = (item) => {
        setSelectedPokemon(item);
    };

    return (
        <AppBackground>
            <TrainerHUD></TrainerHUD>
            <DataContext.Provider value={{ selectedPokemon, handlePokemonSelected }}>
                <Grid container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid item xs={6}>
                        <Carousel>
                            {
                                loggedUser.boxes.map(box => (
                                    <PokemonBox pokemons={box.pokemons} name={box.name}></PokemonBox>
                                ))
                            }
                        </Carousel>
                    </Grid>
                    <Grid item xs={6}>
                        <PokemonView></PokemonView>
                    </Grid>
                </Grid>
            </DataContext.Provider>
        </AppBackground>
    );
}
export default HomePage;