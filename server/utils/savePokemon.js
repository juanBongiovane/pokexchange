const Pokedex = require("../models/Pokedex");
const savePokemon = async function (pokemon) {
    let newPokemon = new Pokedex({ _id: pokemon.id, name: pokemon.name, color: pokemon.color.name, evolutions: [] });
    await newPokemon.save();
    console.log(`${newPokemon.name} guardado correctamente.`);
}
module.exports = { savePokemon};