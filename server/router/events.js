const express = require('express')
const EventController = require('../controller/event')
const router = express.Router()

router.get('/', EventController.get)
router.post('/', EventController.create)
router.put('/:id', EventController.update)

module.exports = router