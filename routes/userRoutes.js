const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Ruta para crear un usuario de prueba
router.get('/create-user', async (req, res) => {
    try {
        const newUser = await User.create({
            name: 'Juan',
            last_name: 'Pérez',
            identification_type: 'DNI',
            identification: '12345678',
            email: 'juan@example.com',
            phone_number: '123456789',
        });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;