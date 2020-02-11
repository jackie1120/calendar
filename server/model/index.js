const Sequelize = require('sequelize')
const path = require('path')
const fs = require('fs')
const models = {}
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '../temp/calendar.sqlite'),
  define: {
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  }
})

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    models[model.name] = model
  })

module.exports = { sequelize, Sequelize, ...models }