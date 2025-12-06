'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Game.init({
    name: DataTypes.TEXT,
    company: DataTypes.TEXT,
    description: DataTypes.TEXT,
    genres: DataTypes.TEXT,
    imagenes: DataTypes.TEXT,
    precio: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};