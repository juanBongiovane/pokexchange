import React, {useContext} from 'react';
import '../../assets/styles/pokemonBox.css';
import {BASE_API_URL} from "../../constants/apiRoutes";
import {DataContext} from "./index";
import {Box} from "@mui/material";




const PokemonBox = ({pokemons, name})=>{

    const { selectedPokemon, handlePokemonSelected } = useContext(DataContext);
    const genericEmpty = `${BASE_API_URL}/public/images/generic/empty-pokemon.jpeg`;
    const pokemonEmpty = (pokemons, totalPokemon, genericEmpty) => {
        const pokemonsCopy = [...pokemons];
        while (pokemonsCopy.length < totalPokemon) {
            pokemonsCopy.push({
                species: {imgGif: genericEmpty},
                name: 'Pokemon Empty',
            });
        }
        return pokemonsCopy;
    };

    const totalPokemon = 30;

    const filledPokemon = pokemonEmpty(pokemons, totalPokemon, genericEmpty);
    return (
        <div>
            <Box className="text-box">{name}</Box>
            <div className="pokemon-grid"
            >
                {filledPokemon.map((pokemon, index) => (
                    <div key={index}
                         className="pokemon-wrapper"
                         onClick={() => handlePokemonSelected(pokemon.name)}>
                        <img
                            src={pokemon.species.imgGif}
                            alt={pokemon.name}
                        />
                    </div>
                ))}
            </div>
        </div>

    );
}
export default PokemonBox;