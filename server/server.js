const app = require('./app');
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('El servidor está escuchando en el puerto 4000')
})