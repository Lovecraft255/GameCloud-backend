"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Games", [
      {
        id: uuidv4(),
        name: "The Legend of Sequelize",
        company: "GameCloud Studios",
        description:
          "An epic adventure game that explores the depths of database management.",
        genres: "Adventure, RPG",
        imagenes: "https://example.com/images/legend-of-sequelize.jpg",
        precio: 59.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Node.js Racing Championship",
        company: "FastCode Games",
        description:
          "A high-speed racing game built with Node.js and Sequelize.",
        genres: "Racing, Sports",
        imagenes: "https://example.com/images/nodejs-racing.jpg",
        precio: 49.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Sequelize Strategy Saga",
        company: "Strategic Devs",
        description:
          "A strategy game that challenges players to master database relationships.",
        genres: "Strategy, Simulation",
        imagenes: "https://example.com/images/sequelize-strategy.jpg",
        precio: 39.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "JavaScript Galaxy Warriors",
        company: "Cosmic Code Entertainment",
        description:
          "A space shooter where every enemy represents a JavaScript bug.",
        genres: "Shooter, Arcade",
        imagenes: "https://example.com/images/js-galaxy-warriors.jpg",
        precio: 29.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Postgres Dungeon Crawler",
        company: "DB Master Studio",
        description:
          "Explore dangerous dungeons powered by PostgreSQL logic and schemas.",
        genres: "RPG, Dungeon Crawler",
        imagenes: "https://example.com/images/postgres-dungeon.jpg",
        precio: 34.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "API Heroes",
        company: "Backend Kings",
        description:
          "A hero-based adventure where RESTful skills grant you magical abilities.",
        genres: "Action, Adventure",
        imagenes: "https://example.com/images/api-heroes.jpg",
        precio: 44.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Fullstack Battle Arena",
        company: "DevWarriors",
        description:
          "A MOBA-style game where frameworks and languages fight for domination.",
        genres: "MOBA, Multiplayer",
        imagenes: "https://example.com/images/fullstack-battle.jpg",
        precio: 59.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "TypeScript Tactics",
        company: "Typed Games Studio",
        description:
          "A tactical combat game where every move must be type-safe.",
        genres: "Tactics, Strategy",
        imagenes: "https://example.com/images/typescript-tactics.jpg",
        precio: 42.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Games", null, {});
  },
};
