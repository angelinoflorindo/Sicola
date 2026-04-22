"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
  
       
    // Adicionar coluna para guardar o comprovativo
    await queryInterface.addColumn("ebooks", "filename", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'N/D',
    });
  },

  async down(queryInterface, Sequelize) {

    //remoção da filename
    await queryInterface.removeColumn("ebooks", "filename");
  },
};
