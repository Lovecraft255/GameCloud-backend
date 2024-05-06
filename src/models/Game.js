const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const User = require("./User");

const Game = sequelize.define("Games", {
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
    allowNull: false,
  },

  imagens: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },

  precio: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});

module.exports = Game;
