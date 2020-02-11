const express = require('express')
const EventController = require('../controller/event')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Events')
})
router.post('/', EventController.create)

module.exports = router