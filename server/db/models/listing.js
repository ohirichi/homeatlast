const Sequelize = require('sequelize')
const db = require('../db')

const Listing = db.define(
  'listing',
  {
    street: {
      type: Sequelize.STRING,
      allowNull: false
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.VIRTUAL,
      get() {
        return (
          this.getDataValue('street') +
          ', ' +
          this.getDataValue('city') +
          ', ' +
          this.getDataValue('state')
        )
      }
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    beds: {
      type: Sequelize.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    baths: {
      type: Sequelize.DECIMAL,
      allowNull: true,
      defaultValue: 0
    }
  },
  {
    validate: {
      function() {
        if (this.getDataValue('street') === '') {
          throw new Error('Street cannot be empty')
        }
      }
    }
  }
)

//Class Funtion: Search by Criteria

Listing.findByCriteria = function(searchObj) {
  return Listing.findAll({where: searchObj})
}

module.exports = Listing
