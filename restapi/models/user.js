const Sequelize = require('sequelize');
const _db = require('../utility/database');

const User = _db.define('users',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING
});

module.exports = User;