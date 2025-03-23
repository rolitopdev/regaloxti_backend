const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Recipient = sequelize.define('Recipient', {
    recipient_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.TEXT,
    },
    notes: {
        type: DataTypes.TEXT,
    },
});

module.exports = Recipient;