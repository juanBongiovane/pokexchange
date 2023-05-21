const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');
const userController = require('../controllers/userController')
const { authenticateToken } = require('./middleware');


router.post('/pokemon', authenticateToken, pokemonController.createPokemon);
router.get('/pokemons', authenticateToken, pokemonController.getPokemon);

router.post('/newUser', authenticateToken, userController.createUser);
router.get('/users', authenticateToken, userController.getUser);


router.get('/user', authenticateToken, userController.getUserById);

router.post('/search', authenticateToken, pokemonController.getPokemon )

module.exports = router;
