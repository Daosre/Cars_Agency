const express = require('express')
const { insertCar, insertCarImage, Delete_Cars, All_Cars } = require('../CarsController')
const router = express.Router()

//Cars Road
router.post('/Add_Cars', insertCar)
router.post('/Add_Cars/picture', insertCarImage)
router.delete('/Delete_Cars', Delete_Cars)
router.get('/All_Cars', All_Cars)
module.exports = router