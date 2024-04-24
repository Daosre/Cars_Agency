const express = require('express')
const { Add_User } = require('../User')
const { verifData } = require('../../MiddleWares/Middle')
const router = express.Router()


router.post('/Add_User',verifData, Add_User)

module.exports = router