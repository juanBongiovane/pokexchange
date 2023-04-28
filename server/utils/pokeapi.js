const {POKE_API_URL_POKEMON}= require('../config/constants')
const {response} = require("express");
const {error} = require("server/router");
const pokeApiFindPokemon = async function (name){
    const url = POKE_API_URL_POKEMON + name;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error al consultar la API:', error);
        });
    return json;
}

const pokeApiEvolution = function (url){
    return fetch(url)
        .then((response)=>{
            if(!response.ok){
                throw  new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch((error) =>{
            console.error('Error al consultar la API:', error);
    });
}

module.exports = { pokeApiFindPokemon, pokeApiEvolution};