"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
   
    // alterar colunas
    await queryInterface.changeColumn("users", "curso", {
      type: Sequelize.ENUM("GBS", "IGF", "CF", "OUTRO"),
    });

    await queryInterface.changeColumn("users", "perfil", {
      type: Sequelize.ENUM("ADMIN", "ESTUDANTE", "ORIENTADOR", "VISITANTE"),
    });

    // Adicionar nova coluna
    await queryInterface.addColumn("users", "situacao", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  },

  async down(queryInterface, Sequelize) {
   // alterar colunas
    await queryInterface.changeColumn("users", "curso", {
      type: Sequelize.ENUM("GBS", "IGF", "CF"),
    });

    await queryInterface.changeColumn("users", "perfil", {
      type: Sequelize.ENUM("ADMIN", "ESTUDANTE", "EXPLICADOR"),
    });

    // Remoção nova coluna

    await queryInterface.removeColumn("users", "situacao");


  },
};
