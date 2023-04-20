const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

// Ruta principal
router.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

router.post('/pokemon', pokemonController.createPokemon);
router.get('/pokemons', pokemonController.getPokemons);

module.exports = router;