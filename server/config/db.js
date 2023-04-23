const mongoose = require('mongoose');
const config = require('config');

const url = config.get('mongodb.url');
const options = config.get('mongodb.options');

const connectDB = async () => {
    try {
        await mongoose.connect(url, options);
        console.log('Conexión a la base de datos establecida');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

//
// const connectDB = () => {
//
//     mongoose.connect(config.get('mongodb.url'), config.get('mongodb.options')).then(() => {
//         console.log('Conexión a la base de datos establecida');
//
//         const Pokemon = mongoose.model("pokemon", pokemonSchema, "pokemon");
//         const newPokemon = new Pokemon();
//         newPokemon.name = "Pikachu";
//         newPokemon.level = 100;
//         newPokemon.color = "yellow";
//         newPokemon.save();
//
//         Pokemon.find({}).then(data => console.log(data));
//
//     }).catch(err => console.log(err))
// }


module.exports = connectDB;