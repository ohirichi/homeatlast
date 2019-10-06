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

/** TO DO - SET UP TEST TO CHECK MODEL VALIDATIONS */

describe('Lisiting Model Validations', () => {
  const listing = Listing.build({city, state, country, price})

  // expect(listing.validate()).to.throw("notNull Violation: listing.street cannot be null")
  it('throws an error if street is missing', () => {
    return listing
      .validate()
      .then(() => {
        console.log('went in the then')
      })
      .catch(err => {
        // console.log("I'm logging the error: ", err.errors)
        expect(err).to.have.nested.include({
          'errors[0].type': 'notNull Violation',
          'errors[0].path': 'street'
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
