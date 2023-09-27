const Sequelize = require('sequelize');

const sequelize = require('../database/database');

const Event = sequelize.define('event', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    event_name: Sequelize.STRING,
    event_description: Sequelize.STRING,
    event_img: Sequelize.STRING,
    phoneNumber: Sequelize.STRING,
    event_date: {
        type: Sequelize.DATE(6),
        allowNull: false,
    }
});

module.exports = Event;