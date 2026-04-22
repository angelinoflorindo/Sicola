"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Adicionar coluna para guardar o foto de perfil
    await queryInterface.addColumn("users", "universidade_id", {
      type: Sequelize.STRING,
      allowNull: false, 
      defaultValue:1,
    });

    // remover  a coluna de curso
    await queryInterface.removeColumn("users", "curso");
  },

  async down(queryInterface, Sequelize) {
    //remoção da filename
    await queryInterface.removeColumn("users", "universidade_id");

    // rever  a coluna de curso
    await queryInterface.addColumn("users", "curso", {
      type: Sequelize.ENUM('GBS', 'IGF', 'CF', 'OUTRO'),
    });
  },
};
