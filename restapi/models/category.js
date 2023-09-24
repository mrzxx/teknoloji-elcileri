const Sequelize = require('sequelize');
const _db = require('../utility/database');

const Category = _db.define('category',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name: Sequelize.STRING,
    description: {
        type:Sequelize.STRING,
        allowNull:true
    }
});

module.exports = Category;