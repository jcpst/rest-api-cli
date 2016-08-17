'use strict'

const logger = require('morgan')
const restify = require('restify')
const queries = require('./queries')

const server = restify.createServer({})

server.pre(restify.pre.sanitizePath())
server.use(logger('dev'))
server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser())
server.use(restify.bodyParser())

queries(server)

server.listen(8079, () => {
  console.log(`listening at ${server.url}`)
})

