const Sequelize = require('sequelize');

module.exports = class Todo extends Sequelize.Model {
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
      modelName: 'Todo',
      tableName: 'todo',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Todo.belongsTo(db.User);
    db.Todo.hasMany(db.Sub_todo);
    // db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
  }
};
