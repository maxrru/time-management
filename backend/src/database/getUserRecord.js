require('dotenv').config()
const knexOptions = require('../../knexfile')
const knex = require('knex')(knexOptions)

const getUserRecord = ({ username }) => {
  return knex.from('users')
    .where({ username: username })
    .limit(1)
}

module.exports = { getUserRecord }
