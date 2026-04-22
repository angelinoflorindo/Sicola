"use strict";
// Pesteriormente será necessário relacionar com universidades
module.exports = {
  async up(queryInterface, Sequelize) {
  
    // Adicionar nova coluna
    await queryInterface.addColumn("disciplinas", "codigo", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'N/D',
      
    });
  },

  async down(queryInterface, Sequelize) {
   
    // Remoção nova coluna

    await queryInterface.removeColumn("disciplinas", "codigo");

  },
};
