'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'blog',
        'slugIsControlled',
        {
          type: Sequelize.BOOLEAN,
          defaultValue: true
        }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('blog','slugIsControlled');
  }
};
