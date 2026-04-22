"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcrypt");
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashed2 = await bcrypt.hash("999Flor", 12);
    const [faculdade, metadata] = await queryInterface.sequelize.query(
      "SELECT id  FROM universidades WHERE codigo = 'ISAF' LIMIT 1",
    );
    const isafID = faculdade[0].id;

    await queryInterface.bulkUpdate(
      "users",
      {
        universidade_id: isafID,
      },
      {
        universidade_id: 1,
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
