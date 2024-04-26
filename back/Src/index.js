const express = require('express');
const app = express();
const cors = require('cors')
const mysql = require('mysql2')
const UserRoad = require('./Controllers/Road/User_Road')
const CarsRoad = require('./Controllers/Road/Cars_Road')
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({extended:true,}));

app.use('/User', UserRoad)
app.use('/Cars', CarsRoad)

const port = 3108
app.listen(port, () => {
    console.log(`🤯`)
})