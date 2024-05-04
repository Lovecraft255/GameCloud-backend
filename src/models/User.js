const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const User = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.TEXT(20),
    allowNull: false,
  },

  prohilePhoto: {
    type: DataTypes.TEXT(200),
    defaultValue: "",
  },

  saldo: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },

  gamesAmmount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  rol: {
    type: DataTypes.TEXT(20),
    allowNull: false,
  },
});

module.exports = User;
