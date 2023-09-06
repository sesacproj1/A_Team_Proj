'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
  config.username,
  config.password,
  config.database,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
