"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Games",
      [
        {
          id: uuidv4(),
          name: "The Last Kingdom",
          company: "Northern Crown Studios",
          description:
            "Juego de rol y aventura ambientado en un reino medieval en guerra.",
          genres: "RPG, Adventure",
          imagenes: "",
          precio: 59.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: "CyberStrike 2099",
          company: "Neon Future Games",
          description:
            "Shooter futurista en una ciudad cyberpunk dominada por corporaciones.",
          genres: "Shooter, Action",
          imagenes: "",
          precio: 49.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: "Mystic Forest",
          company: "GreenLeaf Interactive",
          description:
            "Explorá un bosque mágico lleno de criaturas y secretos antiguos.",
          genres: "Adventure, Fantasy",
          imagenes: "",
          precio: 29.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: "Speed Horizon",
          company: "Velocity Labs",
          description:
            "Juego de carreras arcade con autos futuristas y pistas extremas.",
          genres: "Racing, Arcade",
          imagenes: "",
          precio: 39.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: "Galactic Conquest",
          company: "Orion Softworks",
          description:
            "Estrategia espacial por turnos donde competís por el control de la galaxia.",
          genres: "Strategy, Sci-Fi",
          imagenes: "",
          precio: 44.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Games", null, {});
  },
};
