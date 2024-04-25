const express = require('express')
const { AddCars } = require('../AddCars')
const router = express.Router()

//Cars Road
router.post('/Cars', AddCars)

module.exports = router