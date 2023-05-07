import React from 'react';

import AppBackground from "../../assets/components/AppBackground";
import PokemonBox from "../../assets/components/PokemonBox";
import TrainerHUD from "../../assets/components/TrainerHUD";

function HomePage() {
    return (
        <AppBackground>
            <TrainerHUD></TrainerHUD>
            <div>
                <PokemonBox pokemons={[]} />
            </div>
        </AppBackground>
    );
}
export default HomePage;