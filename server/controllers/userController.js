const User = require('../models/Users');
const crypto = require('crypto');

const salt = "5aedad4ea14a9c8cd5ae37e59f332a01";

exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        newUser.password = crypto.pbkdf2Sync(newUser.password, salt,1000, 64, `sha512`).toString(`hex`)
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