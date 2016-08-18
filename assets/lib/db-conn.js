'use strict'

const path = require('path')
const knex = require('knex')

let config = {}

if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
  config = {
    client: 'pg',
    connection: {
      database: process.env.KNEX_DATABASE,
      host: process.env.KNEX_HOST,
      password: process.env.KNEX_PASSWORD,
      user: process.env.KNEX_USER
    }
  }
} else {
  config = {
    client: 'sqlite3',
    connection: {
      filename: path.join(process.cwd(), 'db.sqlite')
    },
    useNullAsDefault: true
  }
}

module.exports = knex(config)

