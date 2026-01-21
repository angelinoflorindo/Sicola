'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require('bcrypt')
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const hashed2 = await bcrypt.hash('999Flor', 12);

    await queryInterface.bulkInsert('users', [
      {
        primeiro_nome: 'Angelino',
        segundo_nome: 'Francisco',
        email: '240029@isaf.co.ao',
        password:hashed2,
        curso:'GBS',
        telemovel:'930754775',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
