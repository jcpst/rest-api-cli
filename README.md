REST API cli
============

There are some patterns that I prefer when writing a REST API using node, and
this module is just a simple cli that scaffolds out a basic example of those
patterns.

**Modules Used**:

- [restify][1] - for serving the RESTful endpoints
- [pg][2] - for connecting to a PostgreSQL database
- [knex][3] - for writing database-agnostic queries in js
- [morgan][4] - for logging
- lib - resuable pieces that I wanted to keep with the source, but could
also be required without doing relative paths like `require('../../../conn')`

devDependencies:

- [dotenv][5] - to keep config outside of the code
- [eslint][6] - set up using '[standard][7]' style
- [nodemon][8] - to watch for file changes during development
- [pre-commit][9] - commits fail when `npm test` fails
- [sqlite3][10] - used as the db during development

[1]: http://restify.com/
[2]: https://github.com/brianc/node-postgres
[3]: http://knexjs.org/
[4]: https://github.com/expressjs/morgan
[5]: https://github.com/motdotla/dotenv
[6]: http://eslint.org/
[7]: http://standardjs.com/
[8]: https://github.com/remy/nodemon
[9]: https://github.com/observing/pre-commit
[10]: https://github.com/mapbox/node-sqlite3

Getting Started
---------------

For development, you just need node v4 OR v6 and lastest npm, which you cant get
by running `npm i -g npm`.

**Creating the example project**:

- `npm i -g rest-api-cli`
- `rest-api-cli my-new-project`
- `cd my-new-project`
- `npm i`
- `npm run db`
- `npm start`

You should be able to hit <localhost:8079/people> and get some results

Patterns
--------

The entry point of the application is `src/index.js`, which sets up some restify
plugins, logging, routes, and the server. A line of interest is:

```javascript
queries(server)
```

The `queries` function is the export of the `src/queries/index.js` file. This
file is where we pass out restify server into various files containing routes.

```javascript
module.exports = app => {
  // require your queries here
  require('./people')(app)
  require('./places')(app)
}
```

So that takes us to our `src/queries/people.js` and `src/queries/places.js`,
where the real action is happening.

The `places` file takes advantage of some defaults craeted for calling CRUD
operations that require no relational joins. It uses the queries already written
in `lib/query.js`.

All we have to do is export a function that creates the routes, and pass our
queries as the callback.

```javascript
const db = require('lib/db-conn')
const query = require('lib/query')

const table = 'places'
const columns = [
  'id',
  'city',
  'state',
  'country'
]

const places = query(db, table, columns)

module.exports = app => {
  app.get ('/places'    , places.index  )
  app.get ('/places/:id', places.find   )
  app.post('/places'    , places.create )
  app.put ('/places/:id', places.update )
  app.del ('/places/:id', places.destroy)
}
```

If some joins are needed, then just write the callback functions, like in
`src/queries/people.js`:

```javascript
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
```

**todo**

- add testing

