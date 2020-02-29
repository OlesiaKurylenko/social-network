const { config } = require('dotenv')
config()

const {
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_USERNAME,
    POSTGRES_PASSWORD,
  POSTGRES_PORT
} = process.env

module.exports = {
  development: {
    username: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE,
        host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    dialect: 'postgres'
  },
  test: {
    username: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE,
      host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    dialect: 'postgres'
  },
  production: {
    username: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE,
      host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    dialect: 'postgres'
  }
}