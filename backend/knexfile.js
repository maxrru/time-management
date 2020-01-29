require('dotenv').config()

module.exports = {
  client: 'pg',
  connection: {
    database: 'time_management',
    user: 'maximilian.ungar',
    password: process.env.POSTGRESS_PASSWORD,
    host: 'postgres',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
}
