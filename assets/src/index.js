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
  const routes = server.router.mounts
  const routeKeys = Object.keys(server.router.mounts)
  console.log(`listening...`)
  console.log('urls to try:')
  routeKeys.forEach(route => {
    if (routes[route].method === 'GET' && !/:/.test(routes[route].spec.path)) {
      console.log(`${server.url}${routes[route].spec.path}`)
    }
  })
})

