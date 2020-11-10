const Sequelize = require('sequelize');
const db = require('../config/database');

var nameTable = 'seg_rols';
var Role = db.define(nameTable, {
    ROL_DESCRIPCION: Sequelize.STRING
},
    {
        timestamps: false,
    });

module.exports = Role;