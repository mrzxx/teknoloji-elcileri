const Sequelize = require('sequelize');

const sequelize = require('../database/database');

const Permission = sequelize.define('permission', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
});
module.exports = Permission;