"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcrypt");
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashed1 = await bcrypt.hash("999Flor", 12);
    const hashed2 = await bcrypt.hash("999Chis", 12);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          primeiro_nome: "Angelino",
          segundo_nome: "Francisco",
          email: "240029@isaf.co.ao",
          password: hashed1,
          // curso:'GBS',
          perfil: "ADMIN",
          telemovel: "930754775",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          primeiro_nome: "Rosalina",
          segundo_nome: "Chissua",
          email: "9281310@isaf.co.ao",
          password: hashed2,
          // curso:'GBS',
          perfil: "ADMIN",
          telemovel: "928131087",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { updateOnDuplicate: ["id", "email", "telemovel", "password"] },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
