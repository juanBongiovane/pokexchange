const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    birthDate: Date,
    email: {
        type: String,
        unique: true
    },
    password: String,
    trainer: Number,
    pokemon: Map,
    friends: Map,
    lastLogin: Date
});

module.exports = mongoose.model('Users', userSchema);