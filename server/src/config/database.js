const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.DB_USER, process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB
    }
);

sequelize.authenticate()
    .then(function (err) {
        console.log('DB is connected.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database: ', err);
    });

module.exports = sequelize;