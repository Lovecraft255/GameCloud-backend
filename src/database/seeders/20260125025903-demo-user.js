"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: uuidv4(),
          name: "JuanPerez",
          password: "hashed_password_123", // ⚠️ idealmente hash real
          profilePhoto: "",
          saldo: 1500,
          gamesAmmount: 3,
          email: "juan@example.com",
          refreshToken: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: "MariaGomez",
          password: "hashed_password_456",
          profilePhoto: "",
          saldo: 3200,
          gamesAmmount: 7,
          email: "maria@example.com",
          refreshToken: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: "CarlosLopez",
          password: "hashed_password_789",
          profilePhoto: "",
          saldo: 500,
          gamesAmmount: 1,
          email: "carlos@example.com",
          refreshToken: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: "LuciaFernandez",
          password: "hashed_password_abc",
          profilePhoto: "",
          saldo: 0,
          gamesAmmount: 0,
          email: "lucia@example.com",
          refreshToken: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: "AdminUser",
          password: "hashed_password_admin",
          profilePhoto: "",
          saldo: 9999,
          gamesAmmount: 20,
          email: "admin@example.com",
          refreshToken: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
