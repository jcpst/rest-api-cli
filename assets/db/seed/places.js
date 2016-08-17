'use strict'

module.exports = db => {
  return db('places').insert([
    {
      city: 'New York City',
      country: 'US',
      state: 'NY'
    },
    {
      city: 'Los Angeles',
      country: 'US',
      state: 'CA'
    },
    {
      city: 'Chicago',
      country: 'US',
      state: 'IL'
    },
    {
      city: 'Kansas City',
      country: 'US',
      state: 'MO'
    },
  ])
}

