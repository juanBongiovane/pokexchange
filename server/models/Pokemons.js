const mongoose = require('mongoose');
const { Schema } = mongoose;

const pokemonSchema = new Schema({
    name: String,
    level: Number,
    color: String
});

module.exports = mongoose.model('Pokemon', pokemonSchema);