import React, { useState } from 'react';
import '../styles/pokemonBox.css';
import {BASE_API_URL} from "../../constants/apiRoutes";


// const [selectedPokemon, setSelectedPokemon] = useState(null);



const PokemonBox = ({pokemons, name})=>{
    const pokemonEmpty = (pokemons, totalPokemon, genericEmpty) => {
        const pokemonsCopy = [...pokemons];
        while (pokemonsCopy.length < totalPokemon) {
            pokemonsCopy.push({
                url: genericEmpty,
                name: 'Pokemon Empty',
            });
        }
        return pokemonsCopy;
    };

    const totalPokemon = 30;
    const genericEmpty = `${BASE_API_URL}/public/images/generic/empty-pokemon.jpeg`;
    const filledPokemon = pokemonEmpty(pokemons, totalPokemon, genericEmpty);
    return (
        <div>
            <span className="text-box">{name}</span>
            <div className="pokemon-grid"
                // style={{backgroundColor: name}}
            >
                {filledPokemon.map((pokemon, index) => (
                    <div key={index} className="pokemon-wrapper">
                        <img
                            src={pokemon.url}
                            alt={pokemon.name}
                            // onClick={() => setSelectedPokemon(pokemon)}
                        />
                    </div>
                ))}
            </div>
        </div>

    );
}
export default PokemonBox;