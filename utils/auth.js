// utils/auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Clave secreta para firmar los tokens
const JWT_SECRET = process.env.JWT_SECRET;

// Función para generar un token JWT
const generateToken = (user) => {
    return jwt.sign(
        { user_id: user.user_id, email: user.email }, // Payload (datos del usuario)
        JWT_SECRET, // Clave secreta
        { expiresIn: '72h' } // Tiempo de expiración del token
    );
};

// Función para verificar un token JWT
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET); // Retorna el payload si el token es válido
    } catch (err) {
        return null; // Retorna null si el token es inválido o ha expirado
    }
};

// Función para cifrar una contraseña
const hashPassword = async (password) => {
    const saltRounds = 10; // Número de rondas de cifrado
    return await bcrypt.hash(password, saltRounds);
};

// Función para comparar una contraseña con su versión cifrada
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
    generateToken,
    verifyToken,
    hashPassword,
    comparePassword,
};