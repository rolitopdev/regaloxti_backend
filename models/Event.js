const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Event = sequelize.define('Event', {
    event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    event_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    event_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'events',
    timestamps: false,  // 👈 Opcional, evita que Sequelize agregue createdAt y updatedAt
});

module.exports = Event;