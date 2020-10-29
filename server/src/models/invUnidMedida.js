const Sequelize = require('sequelize');
const db = require('../config/database');

const uniMedi = db.define('inv_unidad_medida',{
    UNI_MED_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    UNI_MED_CODIUNIDAD: {
        type: Sequelize.STRING,
        unique: true,
        required: true
    },

    UNI_MED_DESCRIPCION: {
        type: Sequelize.STRING,
        required: true
    }
},
    {
        timestamps: false,
    }
);

module.exports = uniMedi;
