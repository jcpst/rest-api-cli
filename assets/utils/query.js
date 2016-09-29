'use strict'

function error (err) {
  console.error(err)
}

function success () {
  return { success: true }
}

function query (db, table, columns) {
  function index (req, res, next) {
    db(table)
      .select(columns)
      .then(rows => res.send(rows))
      .then(() => next())
      .catch(error)
  }

  function find (req, res, next) {
    db(table)
      .select(columns)
      .where('id', req.params.id)
      .then(rows => res.send(rows))
      .then(() => next())
      .catch(error)
  }

  function create (req, res, next) {
    const data = JSON.parse(req.body)
    db(table)
      .insert(data)
      .then(() => res.send(success))
      .then(() => next())
      .catch(error)
  }

  function update (req, res, next) {
    const data = JSON.parse(req.body)
    db(table)
      .update(data)
      .then(() => res.send(success))
      .then(() => next())
      .catch(error)
  }

  function destroy (req, res, next) {
    db(table)
      .where('id', req.params.id)
      .del()
      .then(() => res.send(success))
      .then(() => next())
      .catch(error)
  }

  return { index, find, create, update, destroy }
}

exports.error = error
exports.success = success
module.exports = query
