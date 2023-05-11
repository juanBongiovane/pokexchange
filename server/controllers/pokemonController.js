const { findAndSavePokemon } = require('../utils/savePokemon');

findAndSavePokemon('').catch((error) => {
    console.error("Error en findAndSavePokemon:", error);
});

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
