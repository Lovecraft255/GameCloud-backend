const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Game = sequelize.define("Game", {
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
      len: {
        args: [10, 255],
        msg: "El titulo tiene que ser de 10 caracteres o mas",
      },
    },
  },

  company: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: [5, 255],
        msg: "El nombre de la compañia debe ser de mas de 10 caracteres",
      },
    },
  },

  description: {
    type: DataTypes.TEXT,
    validate: {
      len: {
        args: [5, 255],
        msg: "La descripción debe tener al menos 5 caracteres",
      },
    },
  },

  genres: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  imagenes: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },

  precio: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: {
      isFloat: {
        msg: "El precio tiene que ser float",
      },
    },
  },
});

module.exports = Game;
