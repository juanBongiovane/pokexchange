import * as React from 'react';
import '../../assets/styles/PokemonShop.css';

import AppBackground from "../../assets/components/AppBackground";

import {UserContext} from "../../index";
import TrainerHUD from "../../assets/components/TrainerHUD";
import {useContext, useRef, useState} from "react";
import {Autocomplete, Box, CircularProgress, GlobalStyles, Grid, Paper, Stack, TextField, Pagination } from "@mui/material";

import PokemonCard from "../../assets/components/PokemonCard";
import {BASE_API_URL} from "../../constants/apiRoutes";
import axios from "axios";
import { debounce } from 'lodash';
import Cookies from 'js-cookie';



function ShopPage() {

    const [userData, _] = useContext(UserContext);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState({pokemons: []});
    const debouncedSearchRef = useRef();

    const token = Cookies.get('token');

    const handleSearchSubmit = async (searchTerm) => {
        try {
            console.log(searchTerm);
            const response = await axios.post(BASE_API_URL+'/search',
                { term: searchTerm },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            setSearchResults(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    console.log(searchResults);
    const handleSearchChange = (event, value) => {
        setSearch(value);
        if (!debouncedSearchRef.current) {
            debouncedSearchRef.current = debounce(handleSearchSubmit, 300);
        }
        debouncedSearchRef.current(value);
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
                                        <Autocomplete
                                            options={searchResults.pokemons}
                                            getOptionLabel={(option) => option.name}
                                            onInputChange={handleSearchChange}
                                            PaperComponent={({ children, ...other }) =>
                                                <Paper sx={{ bgcolor: 'white' }} {...other}>{children}</Paper>
                                            }
                                            ListboxProps={{ sx: { bgcolor: 'white', '& .MuiAutocomplete-option:hover': { bgcolor: 'lightgray' } } }}
                                            renderOption={(props, option)=> (
                                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0} }} {...props}>
                                                    <img
                                                        loading="lazy"
                                                        width="20"
                                                        src={option.img}
                                                        srcSet={option.img}
                                                        alt=""
                                                    />
                                                    {option.name}
                                                </Box>
                                            )}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Buscar Pokemon"
                                                />
                                            )}
                                            noOptionsText="Sin resultados..."
                                        />
                                        <GlobalStyles
                                            styles={{
                                                '.MuiAutocomplete-noOptions': {
                                                    backgroundColor: 'white',
                                                }
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={9}>
                            <Grid container xs={12} sx={{ height: '100%' }}>
                                <Grid item xs={2} />
                                <Grid
                                    item
                                    xs={8}
                                    sx={{
                                        backgroundColor: 'white',
                                        mt: '20px',
                                        mb: '20px',
                                        borderRadius: '20px',
                                    }}


                                    container
                                >
                                    <Grid item xs={11} sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', alignItems: 'center' }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                            {searchResults.pokemons.map((pokemon) => (
                                                <PokemonCard pokemon={pokemon} key={pokemon.id} />
                                            ))}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={1} justifyContent="center" alignContent="center">
                                        <Stack spacing={2} sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Pagination count={10} variant="outlined" shape="rounded" />
                                        </Stack>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} />
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