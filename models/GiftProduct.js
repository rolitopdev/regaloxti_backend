const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const GiftProduct = sequelize.define('GiftProduct', {
    gift_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'gift_products',
    timestamps: false,
});

module.exports = GiftProduct;