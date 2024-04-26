const express = require('express')
const { Add_User, Log_User, All_Users } = require('../User')
const { verifData } = require('../../MiddleWares/Middle')
const router = express.Router()

//Road User
router.post('/Add_User',verifData, Add_User)
router.post('/Log_User', Log_User)
router.get('/All_User', All_Users)



module.exports = router