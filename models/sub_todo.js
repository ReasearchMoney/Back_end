const Sequelize = require('sequelize');

module.exports = class Sub_todo extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      todo: {
        type: Sequelize.STRING(140),
        allowNull: false,
        },
        date: {
            type: Sequelize.DATEONLY,
            defaultValue:Sequelize.NOW,
            allowNull: false,
             
       
        },
        state: {
            type:Sequelize.INTEGER(255),
            defaultValue: 0,
            allowNull: false,
        }
     
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Sub_todo',
      tableName: 'sub_todo',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Sub_todo.belongsTo(db.Todo);
    // db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
  }
};
