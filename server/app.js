const express = require('express')
const morgan = require('morgan')
const bodyParse = require('body-parser')
const { sequelize } = require('./model')
const port = process.env.PORT || 3000

const app = express()
app.use(bodyParse.json())
app.use(morgan('combined'))
require('./router')(app)

sequelize
  .sync()
  .then(() => console.log('Database connection has been established'))
  .then(() => {
    app.listen(port, () => console.log(`Server has started on port ${port}`))
  })
  .catch(err => {
    console.log('Error has happened: ', err)
  })