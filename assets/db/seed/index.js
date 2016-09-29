'use strict'

const db = require('../../utils/db-conn')

const error = err => {
  throw err
}

require('./places')(db)
  .then(x => x)
  .catch(error)

require('./people')(db)
  .then(() => {
    process.exit(0)
  })
  .catch(error)

