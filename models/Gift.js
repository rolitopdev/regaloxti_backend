const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Gift = sequelize.define('Gift', {
    gift_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    gift_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gift_description: {
        type: DataTypes.TEXT,
    },
    gift_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    delivery_date: {
        type: DataTypes.DATE,
    },
});

module.exports = Gift;