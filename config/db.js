const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,      // Nombre de la base de datos
    process.env.DB_USER,      // Usuario de PostgreSQL
    process.env.DB_PASSWORD,  // Contraseña de PostgreSQL
    {
        host: process.env.DB_HOST,  // Host de la base de datos (por ejemplo, localhost)
        port: process.env.DB_PORT,  // Puerto de PostgreSQL (por defecto 5432)
        dialect: 'postgres',        // Especificamos que usamos PostgreSQL
        logging: false,             // Desactivamos los logs de Sequelize en consola
        dialectOptions: {
            useUTC: false,
        },
        timezone: 'America/Santiago',
    }
);

module.exports = sequelize;