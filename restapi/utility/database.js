
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test', 'root', '', {
    host: 'localhost',
    charset: 'utf8',
    dialect: 'mysql'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });


module.exports = sequelize;


