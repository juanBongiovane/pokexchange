const User = require('../models/Users');
const Pokedex = require('../models/Pokedex');
const crypto = require('crypto');

const salt = "5aedad4ea14a9c8cd5ae37e59f332a01";

async function insertUserPokemon () {
    const pokemons = (await Pokedex.find({name:{$in:['bulbasaur', 'raichu']}})).map(e => {return {name: e.name, level: 1, species: e._id};});

    await User.findOneAndUpdate({name:"borja"}, {"boxes.2": [{name: "caja 1", pokemons: pokemons}]}, {new: true, upsert: true});
}
insertUserPokemon();

exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        newUser.password = crypto.pbkdf2Sync(newUser.password, salt,1000, 64, `sha512`).toString(`hex`)
        newUser.boxes = [{name: "box 1", pokemons:[]}, {name: "box 2", pokemons:[]}, {name: "box 3", pokemons:[]}];
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