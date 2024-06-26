const Sequelize = require('sequelize');

const sequelize = require('../database/database');

const Company = sequelize.define('company', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tax_no: Sequelize.STRING,
    company_title: Sequelize.STRING,
    company_person: Sequelize.STRING,
    company_sector: Sequelize.STRING,
    email:Sequelize.STRING,
    password: Sequelize.STRING,
    phoneNumber: Sequelize.STRING,
    /*
    role: {
        type: Sequelize.INTEGER,
    
        references: {
          // This is a reference to another model
          model: Role,
    
          // This is the column name of the referenced model
          key: 'id',
    
          // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
          deferrable: Sequelize.INITIALLY_IMMEDIATE
          // Options:
          // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
          // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
          // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
        }
    },
    */
   /*
    permissions: [{
        type: Sequelize.INTEGER,
        ref: 'Permissions'
    }],
    */
    registerDate: {
        type: Sequelize.DATE(6),
        defaultValue: Sequelize.NOW
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Company;