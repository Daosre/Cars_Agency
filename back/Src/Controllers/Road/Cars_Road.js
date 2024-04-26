const express = require('express')
const { AddCars } = require('../CarsController')
const router = express.Router()

//Cars Road
router.post('/Add_Cars', AddCars)

module.exports = router