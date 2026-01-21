'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('disciplinas', [
      {
        nome: 'MATEMATICAI',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'CONTABILIDADEII',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'CALCULO',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'ESTATISTICAI',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('disciplinas', null, {});
  }
};
