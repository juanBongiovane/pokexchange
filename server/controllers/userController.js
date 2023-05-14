const User = require('../models/Users');
const Pokedex = require('../models/Pokedex');
const crypto = require('crypto');

const salt = "5aedad4ea14a9c8cd5ae37e59f332a01";

// async function insertUserPokemon () {
//     const pokemons = (await Pokedex.find({name:{$in:['bulbasaur', 'raichu']}})).map(e => {return {name: e.name, level: 1, species: e._id};});
//
//     await User.findOneAndUpdate({name:"borja"}, {"boxes.2": [{name: "caja 1", pokemons: pokemons}]}, {new: true, upsert: true});
// }
// insertUserPokemon();



exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserByName = async (req, res) => {
    try {
        const { name } = req.params;
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId)
            .populate('friends')
            .populate('boxes.pokemons.species');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error getting user by ID' });
    }
};

