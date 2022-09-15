'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   return [
       queryInterface.addColumn("Sub_todo", "todo", {
    type: Sequelize.STRING(140),
        allowNull: false,
       }),
      queryInterface.addColumn("Sub_todo", "date", {
     type: Sequelize.DATEONLY,
            defaultValue:Sequelize.NOW,
            allowNull: false,
      }),
      queryInterface.addColumn("Sub_todo", "state", {
     type:Sequelize.INTEGER(255),
            defaultValue: 0,
            allowNull: false,
    }),
    ]
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
