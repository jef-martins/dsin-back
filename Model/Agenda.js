const sequelize = require("./bd");
const Sequelize = require('sequelize');

const Agenda = sequelize.define('agenda', {
    idAgenda: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    service: {
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.STRING
    },
    time: {
        type: Sequelize.STRING
    }
});

module.exports = Agenda