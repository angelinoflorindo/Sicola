"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("materiais", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      valor: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      codigo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
      },

      imagem: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      estado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable("materiais");
  },
};
