const Sequelize = require('sequelize');
const db = require('../config/database');

var nameTable = 'SEG_USUARIOS';

var UserDB = db.define(nameTable, {
    USU_CODIGO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    USU_LOGIN: Sequelize.STRING,
    USU_EMAIL: {
        type: Sequelize.STRING,
        unique: true,
        required: true
    },
    USU_PASSWORD: Sequelize.STRING,
    USU_CEDULA: {
        type: Sequelize.STRING,
        unique: true,
        required: true
    },
    USU_CELULAR: Sequelize.STRING,
    USU_FECHA_CREADO: Sequelize.DATE,
    USU_FECHA_MODIFICADO: Sequelize.DATE,

    // Timestamps 
},
    {
        timestamps: false,
    });

module.exports = UserDB;