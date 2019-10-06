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

describe('Lisiting Model Validations', () => {
  it('throws an error if city, state, country or price is missing', () => {
    const listing = Listing.build()
    return listing
      .validate()
      .then(() => {
        throw new Error('Promise should have returned an error')
      })
      .catch(err => {
        // console.log("I'm logging the error: ", err.errors)
        expect(err).to.have.nested.include({
          'errors[0].type': 'notNull Violation',
          'errors[0].path': 'street',
          'errors[1].type': 'notNull Violation',
          'errors[1].path': 'city',
          'errors[2].type': 'notNull Violation',
          'errors[2].path': 'state',
          'errors[3].type': 'notNull Violation',
          'errors[3].path': 'country',
          'errors[4].type': 'notNull Violation',
          'errors[4].path': 'price'
        })
      })
  })
})

describe('Listing Model Functionality', () => {
  //set up an unsaved instance of a listing using build (same as new Listing() just different syntax)

  it('can return a full address', () => {
    const listing = Listing.build({street, city, state, country, price})

    expect(listing.address).to.equal(street + ', ' + city + ', ' + state)
  })

  it('sets default value of beds and baths to 0 if nothing is specified', () => {
    const listing = Listing.build({street, city, state, country, price})

    expect(listing.beds).to.equal(0)
    expect(listing.baths).to.equal(0)
  })
})
