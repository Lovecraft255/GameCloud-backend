'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
      id: {
       type: Sequelize.UUID,
       defaultValue: Sequelize.UUIDV4,
       allowNull: false,
       primaryKey: true
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          len: [10, 255],
          msg: "El titulo tiene que ser de 10 caracteres o mas"
        }
      },
      company: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          len: [2, 100],
          msg: "La compañia tiene que ser de 2 caracteres o mas"
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          len: [5, 255],
          msg: "La descripcion tiene que ser de 5 caracteres o mas"
        }
      },
      genres: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      imagenes: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      precio: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          isFloat: {
            msg: "El precio tiene que ser float"
          }
        }
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
    await queryInterface.dropTable('Games');
  }
};