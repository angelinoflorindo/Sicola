"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("trabalhos", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      tema: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      valor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      

      grau: {
        type: Sequelize.ENUM(
          "Medio",
          "Licenciatura",
          "Especialidade",
          "Catedratico",
        ),
        allowNull: false,
      },


      area: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      filename: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      estado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("trabalhos");
  },
};
