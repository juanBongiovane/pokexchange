const Pokedex = require("../models/Pokedex");
const {pokeApiFindPokemon, pokeApiEvolution} = require("./pokeapi");
function savePokemon (pokemon) {

    return Pokedex.findById(pokemon.id).then(existingPokemon=>{
        if (existingPokemon) {
            console.log(`El Pokémon ${pokemon.name} ya existe en la base de datos.`);
            throw new Error(`El Pokémon ${pokemon.name} ya existe en la base de datos.`);
        }
        let newPokemon = new Pokedex({ _id: pokemon.id, name: pokemon.name, color: pokemon.color.name, evolutions: [] });
        return newPokemon.save().then(s=>console.log(`${newPokemon.name} guardado correctamente.`));
    }).catch(e => {
        console.error(`Error al guardar el Pokémon ${pokemon.name}:`, error);
        return null;
    });
}
async function findAndSavePokemon(name) {
    try {
        const pokemon = await pokeApiFindPokemon(name);
        const evolution = await pokeApiEvolution(pokemon.evolution_chain.url);
        async function recursiveEvol(chain) {
            await savePokemon(await pokeApiFindPokemon(chain.species.name));
            if (chain.evolves_to.length){
                for (let p of chain.evolves_to) {
                    await recursiveEvol(p);
                }
            }
        }
        if (!evolution.chain.evolves_to.length) {
            await savePokemon(pokemon);
        } else {
            console.log("tiene evolucion");
            await recursiveEvol(evolution.chain);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
module.exports = { findAndSavePokemon};