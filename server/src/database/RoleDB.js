const Sequelize = require('sequelize');
const db = require('../config/database');

var nameTable = 'SEG_ROL';

var Role = db.define(nameTable, {
    ROL_DESCRIPCION: Sequelize.STRING
},
    {
        timestamps: false,
    });

module.exports = Role;