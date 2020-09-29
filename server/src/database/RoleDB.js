const Sequelize = require('sequelize');
const db = require('../config/database');

var nameTable = 'SEG_ROL';

var Role = db.define(nameTable, {
    ROL_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ROL_DESCRIPCION: Sequelize.STRING
},
    {
        timestamps: false,
    });

module.exports = Role;