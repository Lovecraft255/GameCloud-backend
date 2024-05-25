const { DataTypes } = require("sequelize");
const sequelize = require("../../db");


const Game = sequelize.define("Game", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.TEXT(20),
    allowNull: false,
  },

  company: {
    type: DataTypes.TEXT(100),
    allowNull: false,
  },

  descritption: {
    type: DataTypes.TEXT(250),
  },

  genres: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  imagens: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },

  precio: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  }
});

module.exports = Game;
