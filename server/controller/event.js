const { Event, Sequelize } = require('../model')

module.exports = {
  async create(req, res) {
    try {
      const event = await Event.create(req.body)
      res.send({
        code: 0,
        msg: 'Success',
        data: event.toJSON()
      })
    } catch(err) {
      res.status(400).send({
        code: 400,
        msg: err.message
      })
    }
  }
}