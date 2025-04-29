const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OrderProduct = sequelize.define('OrderProduct', {
    order_product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'order_products',
    timestamps: false
});

module.exports = OrderProduct;