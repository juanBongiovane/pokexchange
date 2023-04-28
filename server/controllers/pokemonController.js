const Pokedex = require('../models/Pokedex');
const { pokeApiFindPokemon, pokeApiEvolution } = require('../utils/pokeapi');
const { savePokemon } = require('../utils/savePokemon');
const findPokemon = function () {
    return Pokedex.find({ name: "Slowpoke" });
};

async function findAndSavePokemon() {
    try {
        const fPoke = await findPokemon();
        if (!fPoke.length) {
            const pokemon = await pokeApiFindPokemon('Slowpoke');
            const evolution = await pokeApiEvolution(pokemon.evolution_chain.url);
            console.log("Evolution", evolution.chain.evolves_to);
            if (!evolution.chain.evolves_to.length) {
                savePokemon(pokemon);
            } else {
                console.log("tiene evolucion");
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Llamada a la función
findAndSavePokemon();

/*findPokemon().then(fPoke => {
    if (!fPoke.length) {
        pokeApiFindPokemon('pikachu').then(pokemon => {
            pokeApiEvolution(pokemon.evolution_chain.url).then(evolution => {
                console.log("Evolution", evolution);
                if(!evolution.length){
                    savePokemon(pokemon)
                }else {
                    console.log("tiene evolucion")
                }
            })
        })
    }
})*/

const raichu = new Pokedex({_id: 26, name: "Raichu", color: "Amarillo", evolutions: []});

// raichu.save();



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
