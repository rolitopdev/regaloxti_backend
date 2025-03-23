const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

// Importar modelos
const Role = require('./Role');
const Subscription = require('./Subscription');
const User = require('./User');
const Event = require('./Event');
const Gift = require('./Gift');
const GiftOrder = require('./GiftOrder');
const Recipient = require('./Recipient');

// Establecer relaciones
User.belongsTo(Role, { foreignKey: 'role_id' });
User.belongsTo(Subscription, { foreignKey: 'subscription_id' });
Event.belongsTo(User, { foreignKey: 'user_id' });
Gift.belongsTo(Event, { foreignKey: 'event_id' });
GiftOrder.belongsTo(Gift, { foreignKey: 'gift_id' });
Recipient.belongsTo(Event, { foreignKey: 'event_id' });

// Sincronizar modelos con la base de datos
sequelize.sync()
    .then(() => console.log('[REGALOXTI_BACKEND] 🎁​: Modelos sincronizados con la base de datos'))
    .catch((err) => console.error('[REGALOXTI_BACKEND] 🎁​: Error al sincronizar modelos:', err));

module.exports = {
    Role,
    Subscription,
    User,
    Event,
    Gift,
    GiftOrder,
    Recipient,
};