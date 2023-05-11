import React, {useContext} from "react";
import {DataContext} from "./index";

import '../../assets/styles/pokemonView.css'


const PokemonView = () => {

    const { selectedPokemon } = useContext(DataContext);

    return(
      <div className="pokemon-view">
          <p>{selectedPokemon ? selectedPokemon : 'No item selected'}</p>
      </div>
    );
}

export default PokemonView;