const express = require('express')
const { All_Model } = require('../ModelController')
const router = express.Router()

router.get('/All', All_Model)

module.exports = router