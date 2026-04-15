"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // alterar colunas
    await queryInterface.changeColumn("users", "perfil", {
      type: Sequelize.ENUM(
        "ADMIN",
        "ESTUDANTE",
        "ORIENTADOR",
        "VISITANTE",
        "CANDIDATO", // adicionar o perfil de candidato
      ),
    });
       
    // Adicionar coluna para guardar o foto de perfil
    await queryInterface.addColumn("users", "filename", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'N/D',
    });
  },

  async down(queryInterface, Sequelize) {
    // remoção do candidado colunas
    await queryInterface.changeColumn("users", "perfil", {
      type: Sequelize.ENUM(
        "ADMIN",
        "ESTUDANTE",
        "ORIENTADOR",
        "VISITANTE",
      ),
    });

    //remoção da filename
    await queryInterface.removeColumn("users", "filename");
  },
};
