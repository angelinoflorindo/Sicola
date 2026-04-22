"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const [faculdade, metadata] = await queryInterface.sequelize.query(
      "SELECT id  FROM users WHERE email = '240029@isaf.co.ao' LIMIT 1",
    );
    const userID = faculdade[0].id;

    await queryInterface.bulkInsert(
      "trabalhos",
      [
        {
          tema: `ANÁLISE TEÓRICA E DOCUMENTAL DOS SISTEMAS DE PRONTUÁRIO ELECTRÓNICO `,
          valor: "100000",
          grau: "Especialidade",
          area: "Novas Tecnologias Aplicadas à Saúde",
          descricao: `CUIDADO DE PACIENTES COM TUBERCULOSE PULMONAR NO HOSPITAL SANATÓRIO DO HUAMBO`,
          filename: "S/F",
          estado:true,
          user_id: userID,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          tema: `MELHORIA DO REGISTO DE DADOS DE  PACIENTES DE DIÁLISE`,
          valor: "100000",
          grau: "Especialidade",
          area: "Novas Tecnologias Aplicadas à Saúde",
          descricao: `Centro de Hemodiálise do Huambo`,
          filename: "N/D",
          user_id: userID,
          estado:true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { updateOnDuplicate: ["id", "filename"] },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("trabalhos", null, {});
  },
};
