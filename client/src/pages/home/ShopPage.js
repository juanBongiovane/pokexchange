import * as React from 'react';
import '../../assets/styles/PokemonShop.css';

import AppBackground from "../../assets/components/AppBackground";

import {UserContext} from "../../index";
import TrainerHUD from "../../assets/components/TrainerHUD";
import {useContext, useEffect, useRef, useState} from "react";
import {
    Autocomplete,
    Box,
    CircularProgress,
    GlobalStyles,
    Grid,
    Paper,
    Stack,
    TextField,
    Pagination,
    Modal, Fade, Typography, Backdrop
} from "@mui/material";

import PokemonCard from "../../assets/components/PokemonCard";
import {BASE_API_URL} from "../../constants/apiRoutes";
import axios from "axios";
import { debounce } from 'lodash';
import Cookies from 'js-cookie';




function ShopPage() {

    const [userData, _] = useContext(UserContext);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState({pokemons: [], pages:0, page:1});
    const debouncedSearchRef = useRef();

    const token = Cookies.get('token');

    const [open, setOpen] = React.useState(false);

    const [myPokemon, setMyPokemon] = useState([]);

    useEffect(() => {
        if (userData !== null) {
            userData.boxes.forEach((box) => {
                box.pokemons.forEach((pokemon) => {
                    const pokemonId = pokemon.species._id;

                    if (!myPokemon.includes(pokemonId)) {
                        myPokemon.push(pokemonId);
                    }
                });
            });
            setMyPokemon([...myPokemon]);
        }
    }, [userData]);


    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const handleSearchSubmit = async (searchTerm) => {
        try {
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

    useEffect(() => {
        handleSearchSubmit('default');
        setSearch('default');
    }, []);

    const handleSearchChange = (event, value) => {
        setSearch(value);
        if (!debouncedSearchRef.current) {
            debouncedSearchRef.current = debounce(handleSearchSubmit, 300);
        }
        debouncedSearchRef.current(value);
    };

    const fetchPage = async (page) => {
        try {
            const response = await axios.post(
                BASE_API_URL + '/search',
                { term: search },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    params: {
                        page: page,
                        limit: 16,
                    },
                }
            );
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error al obtener la página siguiente:', error);
        }
    };

    const handlePageChange = (event, page) => {
        if (page === searchResults.page + 1) {
            fetchPage(searchResults.page + 1);
        } else if (page === searchResults.page - 1) {
            fetchPage(searchResults.page - 1);
        } else {
            fetchPage(page);
        }
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
                   <Box sx={{minHeight:"100vh", display:"flex", flexDirection:"column", width: "80%", alignItems:"center"}} >
                       <h1 className={"textShop"}>Tienda Pokemon</h1>
                       <div className={"searchBar"}>
                           <Box sx={{width:"80%"}}>
                               <Autocomplete
                                   freeSolo={true}
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
                       </div>
                       <div className={"container"}>
                           <div className={"pokemonContainer"}>
                               {searchResults.pokemons.map((pokemon) => {
                                   return (<PokemonCard my={myPokemon.includes(pokemon._id)} pokemon={pokemon} key={pokemon._id} onClick={handleOpen} />);
                               })}
                               {searchResults.pokemons.length < 16 ?
                                   Array(16 -searchResults.pokemons.length).fill(0).map((o, i) => {
                                       return (<PokemonCard pokemon={"null"} key={i+1000} />);
                                   })
                                   : <></>
                               }
                           </div>
                       </div>
                       <div className={"pagination"}>
                           <Pagination  page={searchResults.page} count={searchResults.pages} variant="outlined" shape="rounded" onChange={handlePageChange} />
                       </div>
                   </Box>
                </>
            ) : (
            <Grid container justifyContent="center" alignItems="center" style={{ height: '50px' }}>
                <CircularProgress />
            </Grid>
    )}
        </AppBackground>
    );





}
export default ShopPage;