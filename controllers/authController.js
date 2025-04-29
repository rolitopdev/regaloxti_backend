const crypto = require('crypto');
const { Op } = require('sequelize');
const { User, Role } = require('../models');
const { generateToken, hashPassword, comparePassword } = require('../utils/auth');
const createResponse = require('../utils/response');
const { sendPasswordResetEmail } = require('../utils/emailService');
const { now, addOneHour } = require('../utils/time');

// Registrar un nuevo usuario
const register = async (req, res) => {
    const { name, last_name, identification_type, identification, email, phone_number, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json(createResponse(false, 'El usuario ya existe'));
        }

        // Cifrar la contraseña
        const hashedPassword = await hashPassword(password);

        // Crear el usuario
        const newUser = await User.create({
            name,
            last_name,
            identification_type: 'CC',
            identification,
            email,
            phone_number,
            password: hashedPassword,
            role_id: 2, // Rol por defecto (2 = cliente)
        });

        // Generar un token JWT
        const token = generateToken(newUser);

        // Retornar la respuesta estándar
        res.status(201).json(createResponse(true, 'Usuario registrado exitosamente', {
            ...newUser.dataValues,
            email: newUser.email,
            token,
        }));
    } catch (err) {
        res.status(400).json(createResponse(false, err.message));
    }
};

// Iniciar sesión
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por su email
        const user = await User.findOne({
            where: { email },
            include: {
                model: Role
            }
        });

        console.log('USER DATA: ', user);
        if (!user) {
            return res.status(404).json(createResponse(false, 'Usuario no encontrado'));
        }

        // Comparar la contraseña proporcionada con la almacenada
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json(createResponse(false, 'Contraseña incorrecta'));
        }

        // Generar un token JWT
        const token = generateToken(user);

        // Retornar la respuesta estándar
        res.status(200).json(createResponse(true, 'Inicio de sesión exitoso', {
            ...user.dataValues,
            token,
        }));
    } catch (err) {
        res.status(400).json(createResponse(false, err.message));
    }
};

// Solicitar restablecimiento de contraseña
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const emailProvided = email ? email.toString().trim().toLowerCase() : null;
        const user = await User.findOne({ where: { email: emailProvided } });
        if (!user) {
            return res.status(404).json(createResponse(false, 'Usuario no encontrado'));
        }

        // Generar token temporal (expira en 1 hora)
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpires = addOneHour(1, 'hour');

        await user.update({ resetToken, resetTokenExpires });
        await sendPasswordResetEmail(email, resetToken);

        res.json(createResponse(true, 'Correo de restablecimiento enviado'));
    } catch (err) {
        res.status(500).json(createResponse(false, err.message));
    }
};

// Verificar token antes de restablecer la contraseña
const verifyToken = async (req, res) => {
    const { token } = req.params;
    try {

        const user = await User.findOne({
            where: {
                resetToken: token,
                resetTokenExpires: { [Op.gt]: now() }, // Token no expirado
            },
        });

        if (!user) {
            return res.status(400).json(createResponse(false, 'Token inválido o expirado'));
        }

        res.json(createResponse(true, 'Token válido'));
    } catch (err) {
        res.status(500).json(createResponse(false, err.message));
    }

};

// Restablecer contraseña
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {

        const user = await User.findOne({
            where: {
                resetToken: token
            },
        });

        const hashedPassword = await hashPassword(newPassword);
        await user.update({
            password: hashedPassword,
            resetToken: null,
            resetTokenExpires: null,
        });

        res.json(createResponse(true, 'Contraseña actualizada exitosamente'));
    } catch (err) {
        res.status(500).json(createResponse(false, err.message));
    }
};

module.exports = {
    register,
    login,
    requestPasswordReset,
    verifyToken,
    resetPassword
};