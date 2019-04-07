require('dotenv-flow').config();

const { PORT, SERVER, TRUNCATE_ON_RELOAD, DBUSER, DBPASSWD, DBHOST, DBPORT, DATABASE } = process.env;

module.exports = {
  type: 'postgres',
  host: DBHOST,
  port: DBPORT,
  username: DBUSER,
  password: DBPASSWD,
  database: DATABASE,
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
