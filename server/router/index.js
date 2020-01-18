const events = require('./events')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello World')
  })
  app.use('/events', events)
}