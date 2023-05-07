const {POKE_API_URL_POKEMON}= require('../config/constants')
function pokeApiFindPokemon(name) {

    if (name === '' || name === undefined || name === null) {
        console.error('El nombre no puede estar vacío');
        throw new Error('El nombre no puede estar vacío');
    }

    const url = POKE_API_URL_POKEMON + name;

    return fetch(url).then(response=> {
        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    });
}

function pokeApiEvolution(url) {
    return fetch(url).then(response=>{
        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            throw new Error (`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    });
}

module.exports = { pokeApiFindPokemon, pokeApiEvolution};