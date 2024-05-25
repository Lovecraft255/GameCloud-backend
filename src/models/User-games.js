const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const Game = require("./Game");
const User = require("./User");

const User_games = sequelize.define("Users_games", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
  },
  gameId: {
    type: DataTypes.INTEGER,
    references: {
      model: Game,
      key: 'id'
    },
  },
});

module.exports = User_games;
