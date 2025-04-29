const sequelize = require('../config/db');

// Importar modelos
const Role = require('./Role');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const OrderProduct = require('./OrderProduct');

// Establecer relaciones
User.belongsTo(Role, { foreignKey: 'role_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Order, { foreignKey: 'user_id' });

Order.belongsToMany(Product, {
    through: OrderProduct,
    foreignKey: 'order_id',
    otherKey: 'product_id'
});

Product.belongsToMany(Order, {
    through: OrderProduct,
    foreignKey: 'product_id',
    otherKey: 'order_id'
});

// Sincronizar modelos con la base de datos
sequelize.sync()
    .then(() => console.log('[REGALOXTI_BACKEND] 🎁​: Modelos sincronizados con la base de datos'))
    .catch((err) => console.error('[REGALOXTI_BACKEND] 🎁​: Error al sincronizar modelos:', err));

module.exports = {
    Role,
    User,
    Product,
    Order,
    OrderProduct,
};