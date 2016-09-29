'use strict'

const fs = require('fs')
const db = require('../utils/db-conn')
const dbFile = 'db.sqlite'

try {
  let stats = fs.statSync(dbFile)
  if (stats.isFile()) {
    fs.unlinkSync(dbFile)
    console.log('deleted:', dbFile)
  }
} catch (e) {
  console.log("sqlite database doesn't exist yet...")
}

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

