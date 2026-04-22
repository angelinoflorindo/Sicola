"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "universidades",
      [
        {
          nome: "Instituto Superior de Administração e Finanças",
          codigo: "ISAF",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: "Universidade Óscar Risbas",
          codigo: "UOR",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: "Universidade Católica de Angola",
          codigo: "UCAN",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: "Universidade Agostinho Neto",
          codigo: "UAN",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: "Instituto Superior Politécnico Metropolitano de Angola",
          codigo: "IMETRO",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: "Universidade Independente de Angola",
          codigo: "UNIA",
          created_at: new Date(),
          updated_at: new Date(),
        },
        
        {
          nome: "Universidade Metodista de Angola",
          codigo: "METODISTA",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {updateOnDuplicate:['id', 'nome','codigo']},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("universidades", null, {});
  },
};
