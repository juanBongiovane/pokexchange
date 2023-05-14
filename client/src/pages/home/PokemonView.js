import React, {useContext} from "react";
import {DataContext} from "./index";
import {getStages} from "../../utils/pokemonStages";
import '../../assets/styles/pokemonView.css'
import {toUpperCase} from "../../utils/toUpperCase";
import {BASE_API_URL} from "../../constants/apiRoutes";


const PokemonView = () => {
    const { selectedPokemon } = useContext(DataContext);

    return (
        <div className="pokemon-view">
            {selectedPokemon && selectedPokemon.name !=='Pokemon Empty' ? (
                <>
                    <span className="text-view">{selectedPokemon.name}</span>
                    <div>
                        <img
                            src={selectedPokemon.species.img}
                            alt={selectedPokemon.species.name}
                        />
                    </div>
                    <div className="shadow"></div>
                    <div className="pokemon-data">

                        <div>
                            <span>{toUpperCase(selectedPokemon.species.name)}</span>

                            <span>{selectedPokemon.species._id}</span>
                        </div>

                        <span>Nivel: {selectedPokemon.level}</span>

                        <span>{getStages(selectedPokemon.species.stages)}</span>

                    </div>
                </>
                ) : (
                <div className="pokemon-empty">
                    <img
                        src={`${BASE_API_URL}/public/images/generic/pokeball.png`}
                        alt="Seleccione un Pokemon"
                    />
                    <span className="text-view">Seleccione un pokemon de la caja</span>
                </div>

                )}
        </div>
    );
};

export default PokemonView;