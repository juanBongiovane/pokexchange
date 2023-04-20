const Pokemon = require('../models/Pokemons');

exports.createPokemon = async (req, res) => {
    try {
        const newPokemon = new Pokemon(req.body);
        const savedPokemon = await newPokemon.save();
        res.json(savedPokemon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPokemons = async (req, res) => {
    try {
        const pokemons = await Pokemon.find();
        res.json(pokemons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};