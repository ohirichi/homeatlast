const User = require('./user')
const Listing = require('./listing')
const Photo = require('./photo')

/**
 *Associations
 */

Listing.belongsTo(User)
User.hasMany(Listing)
Photo.belongsTo(Listing)
Listing.hasMany(Photo)
Photo.belongsTo(User)
User.hasMany(Photo)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Listing,
  Photo
}
