const express = require('express');
const app = express();
const cors = require('cors')
const mysql = require('mysql2')
const UserRoad = require('./Controllers/Road/Road')
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({extended:true,}));

app.use('/User', UserRoad)

const port = 3107
app.listen(port, () => {
    console.log(`🤯`)
})