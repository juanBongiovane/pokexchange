const express = require('express');
const router = express.Router();

// Ruta principal
router.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

module.exports = router;