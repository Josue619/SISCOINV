const Sequelize = require('sequelize');
const db = require('../config/database');

const uniMedi = db.define('inv_bodeguero_vendedor',{
    BOD_VEN_CODIGO: {
        type: Sequelize.STRING,
        primaryKey: true
    },

    BOD_VEN_USUARIO: {
        type: Sequelize.INTEGER,
        required: false
    },

    BOD_VEN_TIPO: {
        type: Sequelize.STRING,
        required: true
    },

    BOD_VEN_CREADO: {
        type: Sequelize.STRING,
        required: true
    },

    BOD_VEN_FECHA: {
        type: Sequelize.DATE,
        required: true
    },

    BOD_VEN_MODIFICADO: {
        type: Sequelize.STRING,
        required: false
    },

    BOD_VEN_FECHAMODO: {
        type: Sequelize.DATE,
        required: false
    },
},
    {
        timestamps: false,
    }
);

module.exports = uniMedi;