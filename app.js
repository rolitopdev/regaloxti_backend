const express = require('express');
const cors = require('cors');
const app = express();
const authMiddleware = require('./middlewares/authMiddleware');

// Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(authMiddleware);

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

module.exports = app;