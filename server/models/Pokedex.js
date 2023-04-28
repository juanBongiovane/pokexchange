const mongoose = require('mongoose');
const { Schema } = mongoose;

const pokedexSchema = new Schema({
    _id: Number,
    name: String,
    color: String,
    image: String,
    evolutions: [{
        type: Number,
        ref: "Pokedex"
    }]
});

module.exports = mongoose.model('Pokedex', pokedexSchema, "pokedex");