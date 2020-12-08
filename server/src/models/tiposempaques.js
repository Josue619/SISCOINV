const Sequelize = require('sequelize');
const db = require('../config/database');

const tipoEmpaque = db.define('inv_tipo_empaque',{
    TIPO_EMP_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    TIPO_EMP_SIGLAS: {
        type: Sequelize.STRING,
        unique: true,
        required: true
    },

    TIPO_EMP_DESCRIPCION: {
        type: Sequelize.STRING,
        required: true
    }
},
    {
        timestamps: false,
    }
);

module.exports = tipoEmpaque;