const express = require('express');
const app = express();
process.env.NODE_CONFIG_DIR = process.cwd() + "/server/config";
const config = require('config');
const connectDB = require('./config/db');


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var path = require('path');
console.log(path.resolve('./server/public'));
app.use("/public", express.static(path.resolve('./server/public')));

// Conectar a la base de datos
connectDB();

// Rutas
//app.use('/', require('./routes/index'));

module.exports = app;