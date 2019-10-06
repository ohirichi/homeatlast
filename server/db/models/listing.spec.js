const {expect} = require('chai')
const db = require('../index')
const Listing = db.model('listing')

/**
   Clear the database and recreate the tables before beginning a run
*/
describe('Listing model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})

//some values to create the test model with

let street = '123 Main St'
let city = 'Staten Island'
let state = 'New York'
let country = 'USA'
let price = 400000

// All address fields and price field are required and model cannot be created without them. Description and bed and bath fields are not required for model to be created. Default value for beds and baths will be 0 if not provided.

describe('Model validations', () => {
  it('requires a street address', () => {
    const listing = Listing.build({city, state, country, price})
    return listing
      .validate()
      .then(() => {
        throw new Error('Promise should   have rejected')
      })
      .catch(err => {
        expect(err).to.be.an('error')
        expect(err.errors).to.contain.a.thing.with.properties({
          path: 'street',
          type: 'notNull Violation'
        })
      })
  })

  it('requires a city', () => {
    const listing = Listing.build({street, state, country, price})
    return listing
      .validate()
      .then(() => {
        throw new Error('Promise should   have rejected')
      })
      .catch(err => {
        expect(err).to.be.an('error')
        expect(err.errors).to.contain.a.thing.with.properties({
          path: 'city',
          type: 'notNull Violation'
        })
      })
  })
})

describe('model functionality', () => {
  //set up an unsaved instance of a listing using build (same as new Listing() just different syntax)
  const listing = Listing.build(street, city, state, country, price)

  it('can return a full address', () => {
    expect(listing.address).to.equal(street + ', ' + city + ', ' + state)
  })

  it('sets default value of beds and baths to 0 if nothing is specified', () => {
    expect(listing.beds).to.equal(0)
    expect(listing.baths).to.equal(0)
  })
})
