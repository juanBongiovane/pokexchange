import React, {createContext, useContext, useEffect, useState} from 'react';

import AppBackground from "../../assets/components/AppBackground";
import PokemonBox from "./PokemonBox";
import TrainerHUD from "../../assets/components/TrainerHUD";
import Carousel from "./CarouselSliderBox";
import PokemonView from "./PokemonView";
import {Box, CircularProgress, Grid} from "@mui/material";
import {UserContext} from "../../index";
import axios from "axios";
import Cookies from 'js-cookie';
import {BASE_API_URL} from "../../constants/apiRoutes";
import ShopLink from "../../assets/components/ShopLink";


export const DataContext = createContext(null);
function HomePage() {
    const [userData, _] = useContext(UserContext);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const handlePokemonSelected = (item) => {
        setSelectedPokemon(item);
    };
    return (
        <AppBackground>
            {userData ? (
                <>
                    <Box
                        sx={{
                            zIndex: 1000,
                            position: 'absolute',
                            right: '30px',
                            top: '30px',
                        }}
                    >
                        <TrainerHUD></TrainerHUD>
                        <ShopLink></ShopLink>
                    </Box>

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
                                        {userData.boxes.map(box => (
                                            <PokemonBox
                                                pokemons={box.pokemons}
                                                name={box.name}
                                            ></PokemonBox>
                                        ))}
                                    </Carousel>
                                </Grid>
                                <Grid item xs={6}>
                                    <PokemonView selectedPokemon={selectedPokemon} ></PokemonView>
                                </Grid>
                            </Grid>
                    </DataContext.Provider>
                </>
            ) : (
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <CircularProgress />
            </Grid>
    )}
        </AppBackground>
    );
}
export default HomePage;