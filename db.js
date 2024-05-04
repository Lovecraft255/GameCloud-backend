const { Sequelize } = require("sequelize");

const { DB_NAME, USER, PASSWORD, HOST } = require("./env");

const sequelize = new Sequelize(DB_NAME, USER, PASSWORD, {
  dialect: "postgres",
  host: HOST,
});

module.exports = sequelize;