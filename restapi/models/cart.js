const Sequelize = require('sequelize');
const _db = require('../utility/database');

const Cart = _db.define('cart',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }
});

module.exports = Cart;