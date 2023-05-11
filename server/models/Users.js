const mongoose = require('mongoose');
const { Schema } = mongoose;

/*const individualPokemonSchema = new Schema({
    name: String,
    level: String,
    species: {
        type: Number,
        ref: "Pokedex"
    }
})*/

const userSchema = new Schema({
    name: String,
    birthDate: Date,
    email: {
        type: String,
        unique: true
    },
    password: String,
    trainerAvatar: Number,
    coin: Number,
    friends:  [{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }],
    lastLogin: Date,
    boxes: [
        {
            name: String,
            pokemons:[{
                name: String,
                level: String,
                species: {
                    type: Number,
                    ref: "Pokedex"
                }
            }]
        }
    ]

});

module.exports = mongoose.model('Users', userSchema);