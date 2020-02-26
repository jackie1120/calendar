const { Event, Sequelize } = require('../model')
const Op = Sequelize.Op
const moment = require('moment')

module.exports = {
  async create(req, res) {
    try {
      const event = await Event.create(req.body)
      res.send({
        code: 0,
        msg: 'success',
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
  },
  async update(req, res) {
    try {
      delete req.body.id
      const event = await Event.findByPk(req.params.id)
      await event.update(req.body)
      res.send({
        code: 0,
        msg: 'success',
        data: event.toJSON()
      })
    } catch(err) {
      let errMsg = []
      if (err.errors) {
        err.errors.forEach(error => {
          errMsg.push(error.message)
        })
      }else {
        errMsg.push(err.message)
      }
      res.status(200).send({
        code: 400,
        msg: errMsg
      })
    }
  },
  async get(req, res) {
    let startDate = req.query.startDate
    let endDate = req.query.endDate
    try {
      const events = await Event.findAll({
        where: {
          date: {
            [Op.gte]: startDate,
            [Op.lte]: endDate
          }
        }
      })
      if (events.length) {
        const result = {}
        events.forEach(event => {
          let eventDate = moment(event.date).format('YYYY-MM-DD')
          if (typeof result[eventDate] === 'undefined') result[eventDate] = new Array(event)
          else result[eventDate].push(event)
        })
        res.send({
          code: 0,
          msg: 'Success',
          data: result
        })
      } else {
        res.send({
          code: 0,
          msg: '没有找到数据',
          data: events
        })
      }
    } catch (e) {
      res.status(400).send({
        code: 400,
        msg: e.message
      })
    }
  }
}