'use strict'

module.exports = db => {
  return db('people').insert([
    {
      age: 25,
      first_name: 'Bill',
      last_name: 'Myers',
      place_id: 1
    },
    {
      age: 37,
      first_name: 'Angela',
      last_name: 'Trubow',
      place_id: 2
    },
    {
      age: 41,
      first_name: 'Mitch',
      last_name: 'Hallow',
      place_id: 3
    },
    {
      age: 63,
      first_name: 'Susan',
      last_name: 'Rockberry',
      place_id: 4
    }
  ])
}

