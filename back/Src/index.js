const express = require('express');
const app = express();
const cors = require('cors')
const mysql = require('mysql2')
const UserRoad = require('./Controllers/Road/User_Road')
const CarsRoad = require('./Controllers/Road/Cars_Road')
const Model_Road = require('./Controllers/Road/Model_Road')
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({extended:true,}));
app.use(cors())

app.use('/User', UserRoad)
app.use('/Cars', CarsRoad)
app.use('/Model', Model_Road)


const port = 3108
app.listen(port, () => {
    console.log(`🤯`)
})