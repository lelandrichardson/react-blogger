var Sequelize = require('sequelize');
require('dotenv').load();
var sequelize = new Sequelize(process.env.DATABASE_URL);

module.exports = sequelize;