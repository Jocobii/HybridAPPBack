const express = require('express');
const morgan = require('morgan');

// inicializaciones

const app = express();

// configuracion
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev')); //muestra toda las peticiones al servidor
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// variables globales
app.use((req, res, next) => {
    next();
});
// rutas
app.use(require('./routes/index'));

// empezar el servidor
app.listen(app.get('port'), () => {
    console.log('Server en el puerto:', app.get('port'), '🤖');
    console.log('Server iniciado 😎');
})