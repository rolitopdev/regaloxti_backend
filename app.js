const express = require('express');
const cors = require('cors');
const app = express();

const authMiddleware = require('./middlewares/authMiddleware');

const authRoutes = require('./routes/authRoutes'); // Importar rutas de autenticación

// Middlewares
app.use(cors());
app.use(express.json());
app.use(authMiddleware);

// Rutas
app.use('/api/auth', authRoutes);

module.exports = app; // Exportamos la instancia de Express sin iniciar el servidor