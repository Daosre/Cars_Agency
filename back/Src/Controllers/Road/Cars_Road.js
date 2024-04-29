const express = require('express')
const { insertCar, insertCarImage } = require('../CarsController')
const router = express.Router()

//Cars Road
router.post('/Add_Cars', insertCar)
router.post('/Add_Cars/picture', insertCarImage)
module.exports = router