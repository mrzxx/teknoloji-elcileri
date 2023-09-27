const Sequelize = require('sequelize');

const sequelize = require('../database/database');

const EventJoin = sequelize.define('event_join', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    event_id: Sequelize.STRING,
    user_id: Sequelize.STRING,
    user_type: Sequelize.STRING,
    join_time: {
        type: Sequelize.DATE(6),
        allowNull: false,
    }
});

module.exports = EventJoin;