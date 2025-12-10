const { Sequelize } = require("sequelize");

const { USER, PASSWORD, HOST, DB_NAME } = require("../../env");

const sequelize = new Sequelize(DB_NAME, USER, PASSWORD, {
  dialect: "postgres",
  host: HOST,
});

module.exports = sequelize;
