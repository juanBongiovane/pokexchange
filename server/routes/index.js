const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');
const userController = require('../controllers/userController')

// Ruta principal
router.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

router.post('/pokemon', pokemonController.createPokemon);
router.get('/pokemons', pokemonController.getPokemons);

router.post('/user', userController.createUser);
router.get('/users', userController.getUser);

module.exports = router;