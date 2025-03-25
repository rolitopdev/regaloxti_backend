const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// Rutas
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/request-password-reset', authController.requestPasswordReset);
router.post('/reset-password', authController.resetPassword);

module.exports = router;