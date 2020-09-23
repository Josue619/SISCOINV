const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.DB_USER, '',
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB
    }
);

console.log('DB is connected');

module.exports = sequelize;