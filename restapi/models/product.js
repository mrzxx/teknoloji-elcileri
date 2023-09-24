const Sequelize = require('sequelize');
const _db = require('../utility/database');

const Product = _db.define('product',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name: Sequelize.STRING,
    price: {
        type:Sequelize.INTEGER,
        allowNull:false
    },
    description: {
        type:Sequelize.STRING,
        allowNull:true
    }
});

module.exports = Product;