var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URL);

module.exports = sequelize;