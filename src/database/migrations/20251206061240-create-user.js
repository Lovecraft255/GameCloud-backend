"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.TEXT,
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
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 255],
            msg: "La contraseña debe tener minimo 8 caracteres",
          },
        },
      },
      profilePhoto: {
        type: Sequelize.TEXT,
        defaultValue: "",
      },
      saldo: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      gamesAmmount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: false,

        validate: {
          isEmail: true,
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
