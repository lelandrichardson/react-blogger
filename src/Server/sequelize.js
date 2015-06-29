var config = require('../../config');
var Sequelize = require('sequelize');
var db = config.database;

var sequelize = new Sequelize(db.name, db.username, db.password, {
    host: db.host,
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;