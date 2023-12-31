const Sequelize = require('sequelize');
const db = require('../config/database');

// import model for FK roleID
const Role = require('./RoleDB');

var nameTable = 'seg_usuarios';

var UserDB = db.define(nameTable, {
    USU_CODIGO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    SEGROLId: {
        type: Sequelize.INTEGER,
        // This is a reference to another model
        references: {
            model: Role,
            key: 'id'
        }
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
    USU_STATE: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    USU_CREADO_POR: Sequelize.STRING,
    USU_MODIFICADO_POR: Sequelize.STRING,
    USU_FECHA_CREADO: Sequelize.DATE,
    USU_FECHA_MODIFICADO: Sequelize.DATE,

    // Timestamps 
},
    {
        timestamps: false,
    });

UserDB.belongsTo(Role);

module.exports = UserDB;