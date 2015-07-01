var Sequelize = require('sequelize');
var {
        STRING,
        JSON,
        DATE
    } = Sequelize;

var db = require('./sequelize');

var Session = db.define('session', {
    sid: { type: STRING, allowNull: false, primaryKey: true },
    sess: { type: JSON, allowNull: false },
    expire: { type: DATE, allowNull: false }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Session;