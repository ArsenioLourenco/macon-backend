module.exports = {
    type: 'mssql',
    host: process.env.SQL_HOST,
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    port: parseInt(process.env.SQL_PORT),
    synchronize: false,
    logging: false,
    extra: {
      trustServerCertificate: true
  },
    entities: ['**/models/*.ts'],
    migrations: ['src/database/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/models',
      migrationsDir: 'src/database/migration',
      subscribersDir: 'src/subscriber'
    }
  };