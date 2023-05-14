import * as React from 'react';
import InputBase from '@mui/material/InputBase';

import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';
import '../../assets/styles/PokemonShop.css';

import AppBackground from "../../assets/components/AppBackground";

import {UserContext} from "../../index";
import TrainerHUD from "../../assets/components/TrainerHUD";
import {useContext} from "react";
import {Box, CircularProgress, Container, Grid} from "@mui/material";


function ShopPage() {
    const [userData, _] = useContext(UserContext);

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
                    </Box>
                    <Grid container spacing={0} sx={{height: "100%"}} direction={"column"} >
                        <Grid item container xs={2} justifyContent={"center"} alignContent={"center"}>
                                <h2 style={{
                                    fontFamily: "'Press Start 2P', cursive",
                                    fontSize: '24px',
                                }}>Tienda Pokemon</h2>
                        </Grid>
                        <Grid item container xs={1} >
                            <Grid container xs={12}>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={8} sx={{backgroundColor: "white", borderRadius: "20px"}} justifyContent={"center"} alignContent={"center"} container>
                                    <Box sx={{width:"80%"}}>
                                        <InputBase
                                            sx={{
                                                width:"94%",
                                                marginLeft: 1,
                                                flex: 1,
                                                borderBottomColor: 'grey.300',
                                                borderBottomWidth: 1,
                                                borderBottomStyle: 'solid',
                                            }}
                                            placeholder="Buscar Pokemon"
                                            inputProps={{ 'aria-label': 'search google maps' }}
                                        />
                                        <IconButton type="submit" aria-label="search"><SearchIcon />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={9}  >
                            <Grid container xs={12} sx={{height: "100%"}}>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={8} sx={{
                                    backgroundColor: "white",
                                    mt:"20px",
                                    mb:"20px",
                                    borderRadius: "20px"
                                }}
                                      justifyContent={"center"}
                                      alignContent={"center"}
                                      container
                                >
                                    <Box>Pokemon</Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            ) : (
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <CircularProgress />
            </Grid>
    )}
        </AppBackground>
    );
}
export default ShopPage;