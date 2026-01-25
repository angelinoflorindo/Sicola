"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("detalhes", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      indice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      marcada: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      correta: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      resposta_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "respostas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("detalhes");
  },
};
