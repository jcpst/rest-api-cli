'use strict'

module.exports = app => {
  require('./people')(app)
  require('./places')(app)
}

