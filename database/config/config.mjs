
export const options = {
    username: process.env.production.production.DB_USERNAME,
    password: process.env.production.DB_PASSWORD,
    database: process.env.production.DB_NAME,
    host: process.env.production.DB_HOST,
    port: Number(process.env.production.DB_PORT) || 3306,
    dialect: 'mysql',
    // Corrigido: logging (com 'g' no final)
    logging: process.env.production.NODE_ENV === "development" ? console.log : false,
    migrationStorageTableName: 'migrations',
    
    // Recomendado para Produção: Gerenciamento de conexões
    pool: {
        max: 5,           // Máximo de conexões simultâneas
        min: 0,
        acquire: 30000,   // Tempo máximo (ms) tentando conectar antes de dar erro
        idle: 10000       // Tempo para liberar conexão ociosa
    },
    timezone: '+00:00',   // Garante consistência de datas (UTC)
}

if (process.env.production.NODE_ENV === 'production') {
    if (process.env.production.DB_SSL === 'true') {
        options.dialectOptions = {
            ssl: {
                rejectUnauthorized: true
            }
        }
    }
}

export default {
    development: options,
    test: options,
    production: options
}