export const options = {
    username: process.env.DB_USERNAME || 'seu_usuario',
    password: process.env.DB_PASSWORD || 'sua_senha',
    database: process.env.DB_NAME || 'nome_banco',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    migrationStorageTableName: 'migrations',
    
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+00:00',
}

if (process.env.NODE_ENV === 'production' && process.env.DB_SSL === 'true') {
    options.dialectOptions = {
        ssl: {
            rejectUnauthorized: true
        }
    }
}

export default {
    development: options,
    test: options,
    production: options
}