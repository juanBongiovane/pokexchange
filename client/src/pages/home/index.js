import React from 'react';

import AppBackground from "../../assets/components/AppBackground";
import PokemonBox from "../../assets/components/PokemonBox";
import TrainerHUD from "../../assets/components/TrainerHUD";
import Carousel from "../../assets/components/CarouselSliderBox";


const components = [
    <PokemonBox pokemons={[]} name={"blue"} />,
    <PokemonBox pokemons={[]} name={"red"}/>,
    <PokemonBox pokemons={[]} name={"green"} />,
    <PokemonBox pokemons={[]} name={"yellow"} />,
    <PokemonBox pokemons={[]} name={"orange"} />,
    <PokemonBox pokemons={[]} name={"grey"} />,
];

function HomePage() {
    return (
        <AppBackground>
            <TrainerHUD></TrainerHUD>
            <div>
                <Carousel components={components} />
            </div>
        </AppBackground>
    );
}
export default HomePage;