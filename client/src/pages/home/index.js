import React, {createContext, useContext, useEffect, useState} from 'react';

import AppBackground from "../../assets/components/AppBackground";
import PokemonBox from "./PokemonBox";
import TrainerHUD from "../../assets/components/TrainerHUD";
import Carousel from "./CarouselSliderBox";
import PokemonView from "./PokemonView";
import {Box, CircularProgress, createTheme, Grid, styled, ThemeProvider} from "@mui/material";
import {UserContext} from "../../index";
import ShopLink from "../../assets/components/ShopLink";
import FriendList from "../../assets/components/FriendList";

const ModifiedGrid = styled(Grid)(({theme}) => ({
    justifyContent: "flex-start",
    [theme.breakpoints.down('md')]: {
        justifyContent: "center",
        marginTop: "20px"
    }
}));

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
                            height: '30%'
                        }}
                    >
                        <TrainerHUD></TrainerHUD>
                        <ShopLink></ShopLink>
                        <FriendList></FriendList>
                    </Box>
                    <DataContext.Provider value={{ selectedPokemon, handlePokemonSelected }}>
                            <Grid container
                                  direction="row"
                                  justifyContent="center"
                                  alignItems="center"
                                  rowSpacing={1}
                                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            >
                                <ModifiedGrid container item md={6}>
                                    <Carousel>
                                        {userData.boxes.map((box, i ) => (
                                            <PokemonBox
                                                pokemons={box.pokemons}
                                                name={box.name}
                                                key={i+1000}
                                            ></PokemonBox>
                                        ))}
                                    </Carousel>
                                </ModifiedGrid>
                                <ModifiedGrid container item md={6}>
                                    <PokemonView ></PokemonView>
                                </ModifiedGrid>
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