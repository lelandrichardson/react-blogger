var Sequelize = require('sequelize');
require('dotenv').config({ silent: true });
var sequelize = new Sequelize(process.env.DATABASE_URL);

module.exports = sequelize;