var Sequelize = require('sequelize');
var {
        TEXT
    } = Sequelize;

var db = require('./sequelize');

var Version = db.define('version', {
    body: TEXT
}, {
    freezeTableName: true
});

module.exports = Version;