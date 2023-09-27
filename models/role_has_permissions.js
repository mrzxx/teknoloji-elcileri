const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const Role = require('./roles');
const Permission = require('./permissions');

const RoleHasPermission = sequelize.define('role_has_permission', {}, { timestamps: false });
Role.belongsToMany(Permission, { through: RoleHasPermission });
Permission.belongsToMany(Role, { through: RoleHasPermission });



module.exports = RoleHasPermission;
