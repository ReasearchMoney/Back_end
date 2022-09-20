const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      post: {
        type: Sequelize.STRING(2000),
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      period: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pay: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // url_title: {
      //   type: Sequelize.STRING(140),
      //   allowNull: true,
      // },
      image: {
        type: Sequelize.STRING(140),
        allowNull: true,
      },
      institution: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      institution_name: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      zone_1: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      // zone_2: {
      //   type: Sequelize.STRING(140),
      //   allowNull: false,
      // },
     
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
  }
};
