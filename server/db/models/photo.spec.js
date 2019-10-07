const {expect} = require('chai')
const db = require('../index')
const Photo = db.model('photo')

/**
   Clear the database and recreate the tables before beginning a run
*/
describe('Photo model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})

//some values to create the test model with

// let imgOneUrl
// let imgTwoUrl
// let imgThreeUrl
// let imgFourUrl

describe('Photo Model Validations', () => {
  it('throws an error if the image url is missing', () => {
    const photo = Photo.build()
    return photo
      .validate()
      .then(() => {
        throw new Error('Promise should have returned an error')
      })
      .catch(err => {
        // console.log("I'm logging the error: ", err.errors)
        expect(err).to.have.nested.include({
          'errors[0].type': 'notNull Violation',
          'errors[0].path': 'url'
        })
      })
  })
})

describe('Photo Model Functionality', () => {
  //set up an unsaved instance of a Photo using build (same as new Photo() just different syntax)
})
