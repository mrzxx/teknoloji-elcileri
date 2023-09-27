// role_permission.js
const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const User = require('./users');
const Permission = require('./permissions');

const UserHasPermissions = sequelize.define('user_has_permission', {}, { timestamps: false });
User.belongsToMany(Permission, { through: UserHasPermissions });
Permission.belongsToMany(User, { through: UserHasPermissions });



module.exports = UserHasPermissions;
