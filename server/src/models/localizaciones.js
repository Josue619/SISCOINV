const Sequelize = require('sequelize');
const db = require('../config/database');

const localizacion = db.define('inv_localizacion',{
    LCN_LOCALIZACION: {
        type: Sequelize.STRING,
        primaryKey: true,
    },

    LCN_DESCRIPCION: {
        type: Sequelize.STRING,
        required: true
    },

    LCN_NUM_ORDEN: {
        type: Sequelize.INTEGER
    },

    LCN_DESCONTINUADA: {
        type: Sequelize.STRING
        
    },

    LCN_DESCONTINUADA_POR: {
        type: Sequelize.STRING
    },

    LCN_FECHA_DESCONTINUADA: {
        type: Sequelize.DATE
    },

    LCN_TELEFONO: {
        type: Sequelize.STRING
    }
    
},
    {
        timestamps: false,
    }
);

module.exports = localizacion;
