// lib/syncDb.ts
import {sequelize} from './sequelize';

const syncDb = async () => {
  try {
   // await sequelize.addModels([User])
    await sequelize.sync({ force: false }); // Sincroniza os modelos com o banco de dados
    console.log('Banco de dados sincronizado!');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
};

export default syncDb();
