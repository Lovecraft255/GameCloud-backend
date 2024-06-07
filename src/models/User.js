const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

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
    type: DataTypes.TEXT,
    allowNull: false,

    validate: {
      isAlpha: {
        msg: "Solo se permiten roles con caracteristicas alfabeticas",
      },

      len: {
        args: [5, 13],
        msg: "El rol debe tener minimo 5 caracteres",
      },
    },
  },
});

module.exports = User;
