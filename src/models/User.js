const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },

  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isAlpha: {
        msg: "E nombre solo puede tener letras",
      },

      len: {
        args: [2, 200],
        msg: "El nombre de usuario debe tener minimo 2 caracteres",
      },
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 255],
        msg: "La contraseña debe tener minimo 8 caracteres",
      },
    },
  },

  profilePhoto: {
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

  email: {
    type: DataTypes.TEXT,
    allowNull: false,

    validate: {
      isEmail: true,
    },
  },
});

module.exports = User;
