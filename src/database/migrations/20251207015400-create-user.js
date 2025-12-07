'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
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
            args: [6, 100],
            msg: "La contraseña debe tener entre 6 y 100 caracteres",
          },
        },
      },
      profilePhoto: {
        type: Sequelize.TEXT(200),
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
        type: Sequelize.TEXT(200),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "El correo electrónico debe ser válido",
          },
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};