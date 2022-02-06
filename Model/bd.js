const Sequelize = require('sequelize');
const sequelize = new Sequelize('db_cabelereiro', 'root', '', {
    host: "localhost",
    dialect: "mysql",
});

module.exports = sequelize;