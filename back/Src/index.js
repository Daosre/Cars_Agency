const express = require('express');
const app = express();
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({extended:true,}));

const port = 3107
app.listen(port, () => {
    console.log(`🤯`)
})