"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Games", {
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
          len: {
            args: [10, 255],
            msg: "El titulo tiene que ser de 10 caracteres o mas",
          },
        },
      },
      company: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [5, 255],
            msg: "El nombre de la compañia debe ser de mas de 10 caracteres",
          },
        },
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [10, 255],
            msg: "La descripcion debe ser de 10 caracteres o mas",
          },
        },
      },
      genres: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      imagenes: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      precio: {
        type: Sequelize.FLOAT,
        allowNull: false,
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
    await queryInterface.dropTable("Games");
  },
};
