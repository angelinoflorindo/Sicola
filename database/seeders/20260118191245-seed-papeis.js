'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     // 1. Buscar os usuários já inseridos
     const users = await queryInterface.sequelize.query(
      'SELECT id, email FROM users;',
      { type: Sequelize.QueryTypes.SELECT }
    );
    

    // 2. Encontrar os IDs pelos e-mails
    const angelino = users.find(u => u.email === '240029@isaf.co.ao');

  
    await queryInterface.bulkInsert('papeis', [
      {
        perfil:'ADMIN',
        user_id: angelino.id, 
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('papeis', null, {});
  }
};
