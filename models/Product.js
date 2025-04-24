const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.TEXT,
    category: DataTypes.STRING,
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    image_url: DataTypes.TEXT,
    stock: DataTypes.INTEGER,
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active'
    }
}, {
    tableName: 'products',
    timestamps: false,
});

module.exports = Product;