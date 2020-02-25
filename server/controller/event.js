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
      let errMsg = []
      if (err.errors) {
        err.errors.forEach(error => {
          errMsg.push(error.message)
        })
      }
      res.status(200).send({
        code: 400,
        msg: errMsg
      })
    }
  }
}