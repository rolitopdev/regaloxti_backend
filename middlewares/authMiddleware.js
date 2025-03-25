const { verifyToken } = require('../utils/auth');
const createResponse = require('../utils/response');

// Lista de rutas públicas (sin JWT)
const PUBLIC_ROUTES = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/request-password-reset',
    '/api/auth/reset-password',
];

const authMiddleware = (req, res, next) => {
    // Verificar si la ruta actual está en la lista de públicas
    if (PUBLIC_ROUTES.some(route => req.path.startsWith(route))) {
        return next(); // Saltar autenticación
    }

    // Extraer token del header
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json(createResponse(false, 'Token no proporcionado'));
    }

    // Verificar token
    const decoded = verifyToken(token);
    console.log('decoded', decoded)
    if (!decoded) {
        return res.status(403).json(createResponse(false, 'Token inválido o expirado'));
    }

    req.user = decoded; // Adjuntar datos del usuario
    next();
};

module.exports = authMiddleware;