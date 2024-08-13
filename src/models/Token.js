const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const Token = sequelize.define("Token", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Token;
