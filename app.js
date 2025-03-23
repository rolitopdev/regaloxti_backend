const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const app = express();

const mainRoutes = require('./routes'); // Importar rutas principales
const userRoutes = require('./routes/userRoutes'); // Importar rutas de usuari

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/', mainRoutes); // Rutas principales
app.use('/api/users', userRoutes); // Rutas de usuarios

module.exports = app; // Exportamos la instancia de Express sin iniciar el servidor