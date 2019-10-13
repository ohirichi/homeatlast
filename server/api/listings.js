const router = require('express').Router()
const {Listing} = require('../db/models')
module.exports = router

router.get('/', function(req, res, next) {
  Listing.findAll().then(listings => {
    res.json(listings)
  })
})

router.get('/search', function(req, res, next) {
  Listing.findByCriteria(req.body)
    .then(listings => {
      res.status(200)
      res.json(listings)
    })
    .catch(next)
})

router.get('/:id', function(req, res, next) {
  Listing.findById(req.params.id)
    .then(listing => {
      if (listing) {
        res.status(200)
        res.json(listing)
      } else {
        res.status(404)
        res.json()
        next()
      }
    })
    .catch(next)
})

router.post('/', function(req, res, next) {
  Listing.create(req.body)
    .then(listing => {
      res.status(200)
      res.json(listing)
    })
    .catch(next)
})

router.update('/:id', function(req, res, next) {
  Listing.findById(req.params.id)
    .then(listing => listing.update(req.body))
    .then(listing => res.json(listing))
    .catch(next)
})

router.delete('/:id', function(req, res, next) {
  Listing.findById(req.params.id)
    .then(listing => listing.destroy(req.body))
    .then(() => res.sendStatus(204))
    .catch(next)
})
