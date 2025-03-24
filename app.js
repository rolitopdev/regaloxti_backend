const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const app = express();

const mainRoutes = require('./routes'); // Importar rutas principales
const authRoutes = require('./routes/authRoutes'); // Importar rutas de autenticación

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/', mainRoutes); // Rutas principales
app.use('/api/auth', authRoutes);

module.exports = app; // Exportamos la instancia de Express sin iniciar el servidor