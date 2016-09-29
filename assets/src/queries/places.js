'use strict'

const db = require('../../utils/db-conn')
const query = require('../../utils/query')

const table = 'places'
const columns = [
  'id',
  'city',
  'state',
  'country'
]

const places = query(db, table, columns)

module.exports = app => {
  app.get('/places', places.index)
  app.get('/places/:id', places.find)
  app.post('/places', places.create)
  app.put('/places/:id', places.update)
  app.del('/places/:id', places.destroy)
}

