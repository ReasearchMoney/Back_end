const Sequelize = require('sequelize');

module.exports = class Book extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
       bookmark: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Book',
      tableName: 'books',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
      
      db.Book.belongsTo(db.User);
 
  }
};
