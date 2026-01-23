"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("acessos", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      
      inicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      fim: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      plano: {
        type: Sequelize.ENUM("BASICO", "PREMIUM"),
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
      estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.dropTable("acessos");
  },
};
