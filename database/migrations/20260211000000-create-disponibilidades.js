"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("disponibilidades", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
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

      data_sessao: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      formato: {
        type: Sequelize.ENUM("Online", "Presencial", "Ambas"),
        allowNull: false,
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

    await queryInterface.addIndex(
      "disponibilidades",
      ["user_id", "data_sessao"],
      {
        unique: true,
        name: "unique_user_data_sessao",
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("disponibilidades");
  },
};