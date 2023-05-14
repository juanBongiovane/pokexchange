require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const connectDB = require('./config/db');
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 4000;

// Acceso a carpeta publica
app.use("/public", express.static(path.resolve('./server/public')));

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Max-Age", "1800");
    res.header( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(
    cors({
        origin: "*",
        optionsSuccessStatus: 200,
        credentials: true,
        methods: 'GET, POST, PUT, DELETE',
        allowedHeaders: 'Content-Type, Authorization',

    })
);

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

// // Rutas de autenticación
 app.use('/api/auth', authRoutes);

// Rutas principales (index)
app.use('/', indexRoutes);


// Conectar a la base de datos
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    });

