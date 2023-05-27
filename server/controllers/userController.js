const User = require('../models/Users');
const Pokedex = require('../models/Pokedex');
const {ObjectId} = require("mongodb");


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

exports.buyPokemon = async (req, res) => {
    try {
        const buy = req.body.buy;
        const userId = req.userId;
        const pokemon = await Pokedex.findById(buy.id);
        const user = await User.findById(userId);
        const spaceInBoxes = 90 - user.boxes.reduce((count, box) => box.pokemons.length + count, 0);

        if (user.coin >= (buy.count * pokemon.price) && spaceInBoxes > 0) {
            for (let boxIndex = 0; boxIndex < user.boxes.length; boxIndex++) {
                const box = user.boxes[boxIndex];
                const availableSpace = 30 - box.pokemons.length;
                if (availableSpace > 0) {
                    const pokemonsToAdd = Math.min(availableSpace, buy.count);
                    for (let i = 0; i < pokemonsToAdd; i++) {
                        box.pokemons.push({ name: pokemon.name, level: 1, species: buy.id });
                    }
                    buy.count -= pokemonsToAdd;
                    if (buy.count === 0) {
                        break;
                    }
                }
            }
            await User.findByIdAndUpdate({ _id: userId }, { coin: user.coin - (buy.count * pokemon.price), boxes: user.boxes });
        }
        res.status(200).json({});
    } catch (err) {
        res.status(500).json({ error: "Error al comprar pokemon" });
    }
}

exports.sellPokemon = async (req, res) => {
    try {
        const pokemonId = req.body.id;
        const userId = req.userId;
        const user = await User.aggregate([
            {'$match': {'_id': new ObjectId(userId)}
            }, {'$unwind': {'path': '$boxes'}
            }, {'$unwind': { 'path': '$boxes.pokemons'}
            }, {'$match': {'boxes.pokemons._id': new ObjectId(pokemonId)}
            }, {'$replaceRoot': {'newRoot': '$boxes.pokemons'}
            }, {'$lookup': {'from': 'pokedex', 'localField': 'species', 'foreignField': '_id', 'as': 'species'}
            }
        ]);
        const price = user[0].species[0].price;
        await User.findOneAndUpdate(
            { "_id": new ObjectId(userId), "boxes.pokemons._id": new ObjectId(pokemonId) },
            {
                "$pull": { "boxes.$[].pokemons": { "_id": new ObjectId(pokemonId) } },
                "$inc": { "coin": (Math.round(price-price*0.3)) }
            }
        );
        res.status(200).json({});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error al vender el pokemon" });
    }
};

exports.savePokemon = async (req, res) =>{
    try{
        const pokemon = req.body;
        console.log(pokemon);
        const userId = req.userId;
        const user = await User.findOne({ 'boxes.pokemons._id': pokemon.id });
        const box = user.boxes[pokemon.box];
        const pokemonIndex = box.pokemons.findIndex((poke) => poke._id.equals(pokemon.id));
        const movedPokemon = box.pokemons[pokemonIndex];
        box.pokemons.splice(pokemonIndex, 1);
        await user.save();
        console.log(user);
        res.status(200).json({});
    }catch (err){
        console.log(err);
        res.status(500).json({ error: "Error editar el pokemon" });
    }
}

