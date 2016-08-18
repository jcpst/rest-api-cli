'use strict'

const db = require('lib/db-conn')

const error = err => {
  throw err
}

require('./places')(db)
  .then(x => x)
  .catch(error)
require('./people')(db)
  .tap(() => {
    console.log('control-c to exit...')
  })
  .catch(error)

