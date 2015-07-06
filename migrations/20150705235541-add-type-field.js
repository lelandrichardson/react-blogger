'use strict';


module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'blog',
        'type',
        {
          type: Sequelize.STRING(4),
          defaultValue: 'blog',
          allowNull: false,
          validate: {
            isIn: [['blog','page']]
          }
        }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('blog','type');
  }
};
