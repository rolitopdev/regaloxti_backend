const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const GiftOrder = sequelize.define('GiftOrder', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    order_status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = GiftOrder;