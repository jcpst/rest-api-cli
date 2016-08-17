'use strict'

const db = require('lib/db-conn')
const query = require('lib/query')

const table = 'people'
const columns = [
  'p.id',
  'p.first_name',
  'p.last_name',
  'p.age',
  'pl.city',
  'pl.state',
  'pl.country'
]

const people = query(db, table, columns)

// Write our own queries for the GET methods,
// so we can add some joins
function index (req, res, next) {
  db(`${table} AS p`)
    .select(columns)
    .leftJoin('places AS pl', 'p.place_id', 'pl.id')
    .then(rows => res.send(rows))
    .then(() => next())
    .catch(query.error)
}

function find (req, res, next) {
  db(`${table} AS p`)
    .select(columns)
    .where('p.id', req.params.id)
    .leftJoin('places AS pl', 'p.place_id', 'pl.id')
    .then(rows => res.send(rows))
    .then(() => next())
    .catch(query.error)
}

module.exports = app => {
  app.get('/people', index)
  app.get('/people/:id', find)
  app.post('/people', people.create)
  app.put('/people/:id', people.update)
  app.del('/people/:id', people.destroy)
}

