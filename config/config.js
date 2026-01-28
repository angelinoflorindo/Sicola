

module.exports = {
  development: {
    username: process.env.production.DB_USER,
    password: process.env.production.DB_PASS,
    database: process.env.production.DB_NAME,
    host: process.env.production.DB_HOST,
    port: process.env.production.DB_PORT,
    dialect: 'mysql'
  }
};
