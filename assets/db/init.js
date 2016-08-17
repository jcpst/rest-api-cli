'use strict'

const db = require('lib/db-conn')

db.schema
  // ==========================================================================
  // Places
  // ==========================================================================
  .createTable('places', t => {
    t.increments()
    t.string('city')
    t.string('state')
    t.string('country')
  })
  // ==========================================================================
  // People
  // ==========================================================================
  .createTable('people', t => {
    t.increments()
    t.string('first_name')
    t.string('last_name')
    t.integer('age')
    t.integer('place_id').references('id').inTable('places')
    t.timestamps()
  })

  .then(() => {
    console.log('tables successfully written to the database')
    process.exit(0)
  })
  .catch(e => {
    console.error(e)
  })

