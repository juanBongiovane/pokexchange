const { findAndSavePokemon } = require('../utils/savePokemon');
const Pokedex = require("../models/Pokedex");

// quinta generacion hasta la 649

// for (let i = 100; i<=649; i++){
//     findAndSavePokemon(i).catch((error) => {
//         console.error("Error en findAndSavePokemon:", error);
//     });
// }

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

exports.getPokemon = async (req, res) => {

    try{
        const search = req.body.term;
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 25;

        if (!search || search.trim() === '') {
            return res.status(400).json({ message: 'El término de búsqueda está vacío' });
        }
        const skip = (page - 1) * limit;

        const pokemons = await Pokedex.find({ name: { $regex: search, "$options": "i" } })
            .skip(skip)
            .limit(limit);

        const total = await Pokedex.countDocuments({ name: { $regex: search, "$options": "i" } });

        res.json({
            total,
            page,
            pages: Math.ceil(total / limit),
            pokemons
        });

    }catch (error){
        res.status(500).json({ message: error.message });
    }
}
