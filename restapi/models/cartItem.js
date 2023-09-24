const Sequelize = require('sequelize');
const _db = require('../utility/database');

const CartItem = _db.define('cartitem',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull:false,
    }
});

module.exports = CartItem;