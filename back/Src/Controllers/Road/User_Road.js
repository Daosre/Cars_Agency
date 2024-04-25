const express = require('express')
const { Add_User, Log_User } = require('../User')
const { verifData } = require('../../MiddleWares/Middle')
const router = express.Router()

//Road User
router.post('/Add_User',verifData, Add_User)
router.post('/Log_User', Log_User)



module.exports = router