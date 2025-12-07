"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        id: uuidv4(),
        name: "Carlos",
        password: "password123",
        profilePhoto: "",
        saldo: 100,
        gamesAmmount: 2,
        email: "carlos@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Mariana",
        password: "contraseña456",
        profilePhoto: "",
        saldo: 250.5,
        gamesAmmount: 5,
        email: "mariana@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Luciano",
        password: "claveSegura789",
        profilePhoto: "",
        saldo: 0,
        gamesAmmount: 1,
        email: "luciano@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Valeria",
        password: "valeria2024",
        profilePhoto: "",
        saldo: 50,
        gamesAmmount: 0,
        email: "valeria@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Santiago",
        password: "santiPass88",
        profilePhoto: "",
        saldo: 500,
        gamesAmmount: 12,
        email: "santiago@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Nadia",
        password: "nadiaClave01",
        profilePhoto: "",
        saldo: 75,
        gamesAmmount: 3,
        email: "nadia@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Franco",
        password: "francoXD123",
        profilePhoto: "",
        saldo: 15,
        gamesAmmount: 1,
        email: "franco@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Julieta",
        password: "julieta321",
        profilePhoto: "",
        saldo: 999,
        gamesAmmount: 20,
        email: "julieta@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
