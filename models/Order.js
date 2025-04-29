const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT
    },
    recipient_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    recipient_phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    recipient_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latlng: {
        type: DataTypes.JSON,
        allowNull: false
    },
    delivery_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'orders',
    timestamps: false
});

module.exports = Order;
