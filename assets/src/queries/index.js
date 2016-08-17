'use strict'

module.exports = app => {
  // require your queries here
  require('./people')(app)
  require('./places')(app)
}

