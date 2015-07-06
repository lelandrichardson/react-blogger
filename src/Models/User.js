var Sequelize = require('sequelize');
var {
        STRING
    } = Sequelize;

var bcrypt = require('bcrypt');
var db = require('./../Server/sequelize');

var User = db.define('user', {
    username: { type: STRING, allowNull: false, unique: true },
    name: { type: STRING, allowNull: false },
    password: {
        type: STRING,
        set: function(v) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(v, salt);
            this.setDataValue('password', hash);
        }
    }
}, {
    freezeTableName: true,
    indexes: [
        {
            unique: true,
            fields: ['username']
        }
    ]
});

module.exports = User;