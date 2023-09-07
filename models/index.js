'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const User = require('./User')(sequelize, Sequelize);
const Profile = require('./Profile')(sequelize, Sequelize);
const Friend = require('./Friend')(sequelize, Sequelize);
const MyLetter = require('./MyLetter')(sequelize, Sequelize);
const Admin = require('./Admin')(sequelize, Sequelize);
const Post = require('./Post')(sequelize, Sequelize);
const Notification = require('./Notification')(sequelize, Sequelize);
const Notice = require('./Notice')(sequelize, Sequelize);

User.hasOne(Profile, {
  foreignKey: 'id',
  sourceKey: 'id',
  onDelete: 'CASCADE',
});
Profile.belongsTo(User, { foreignKey: 'id', targetKey: 'id' });

User.hasMany(Friend, {
  foreignKey: 'id',
  sourceKey: 'id',
  onDelete: 'CASCADE',
});
Friend.belongsTo(User, { foreignKey: 'id', targetKey: 'id' });

User.hasOne(MyLetter, {
  foreignKey: 'id',
  sourceKey: 'id',
  onDelete: 'CASCADE',
});
MyLetter.belongsTo(User, { foreignKey: 'id', targetKey: 'id' });

MyLetter.hasMany(Post, {
  foreignKey: 'letterNo',
  sourceKey: 'letterNo',
  onDelete: 'CASCADE',
});
Post.belongsTo(MyLetter, { foreignKey: 'letterNo', targetKey: 'letterNo' });

User.hasMany(Admin, {
  foreignKey: 'id',
  sourceKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Admin.belongsTo(User, { foreignKey: 'id', targetKey: 'id' });

Admin.hasMany(Notice, {
  foreignKey: 'adminId',
  sourceKey: 'adminId',
  onUpdate: 'CASCADE',
});
Notice.belongsTo(Admin, { foreignKey: 'adminId', targetKey: 'adminId' });

Post.hasOne(Notification, {
  foreignKey: 'postNo',
  sourceKey: 'postNo',
  onDelete: 'CASCADE',
});
Notification.belongsTo(Post, { foreignKey: 'postNo', targetKey: 'postNo' });

db.User = User;
db.Profile = Profile;
db.Friend = Friend;
db.MyLetter = MyLetter;
db.Admin = Admin;
db.Notice = Notice;
db.Notification = Notification;
db.Post = Post;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
