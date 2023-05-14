const { findAndSavePokemon } = require('../utils/savePokemon');
const Pokedex = require("../models/Pokedex");

// findAndSavePokemon('bulbasaur').catch((error) => {
//     console.error("Error en findAndSavePokemon:", error);
// });
//
// const getPokemons = async () => {
//     try {
//         const pokemons = await Pokedex.find({ name: 'pichu' });
//         console.log(pokemons);
//     } catch (error) {
//         console.error('Error fetching pokemons:', error);
//     }
// };
//
// getPokemons();



exports.createPokemon = async (req, res) => {
    try {
        const newPokemon = new Pokedex(req.body);
        const savedPokemon = await newPokemon.save();
        res.json(savedPokemon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPokemons = async (req, res) => {
    try {
        const pokemons = await Pokedex.find();
        res.json(pokemons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
