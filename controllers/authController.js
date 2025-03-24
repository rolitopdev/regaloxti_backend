const { User } = require('../models');
const { generateToken, hashPassword, comparePassword } = require('../utils/auth');
const createResponse = require('../utils/response');

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
            identification_type,
            identification,
            email,
            phone_number,
            password: hashedPassword,
        });

        // Generar un token JWT
        const token = generateToken(newUser);

        // Retornar la respuesta estándar
        res.status(201).json(createResponse(true, 'Usuario registrado exitosamente', {
            user_id: newUser.user_id,
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
        const user = await User.findOne({ where: { email } });
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

module.exports = {
    register,
    login,
};