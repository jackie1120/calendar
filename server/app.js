const express = require('express')
const morgan = require('morgan')
const bodyParse = require('body-parser')
const { sequelize } = require('./model')
const port = process.env.PORT || 3000

const app = express()
app.use(bodyParse.json())
app.use(morgan('combined'))
require('./router')(app)

app.listen(port, () => {
  console.log(`Server has started on port ${port}`)
  sequelize
    .sync()
    .then(() => console.log('Database connection has been established'))
    .catch(error => {
      console.log('Unabled to connect to the database:', error)
    })
})