const mongoose = require('mongoose');
const { Schema } = mongoose;

const pokedexSchema = new Schema({
    _id: Number,
    name: String,
    color: String,
    img: String,
    imgBox: String,
    stages: Number,
    price: Number
});

module.exports = mongoose.model('Pokedex', pokedexSchema, "pokedex");