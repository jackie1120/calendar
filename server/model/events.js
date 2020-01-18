const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {}

  Event.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize
  })
  return Event
}