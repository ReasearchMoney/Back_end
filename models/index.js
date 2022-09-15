const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');
const Todo = require('./todo')
const Sub_todo = require('./sub_todo')


const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;
db.Todo = Todo;
db.Sub_todo = Sub_todo;


User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);
Todo.init(sequelize);
Sub_todo.init(sequelize);


User.associate(db);
Post.associate(db);
Hashtag.associate(db);
Todo.associate(db);
Sub_todo.associate(db);


module.exports = db;