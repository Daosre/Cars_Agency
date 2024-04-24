const { pool } = require('../Connexion/Db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Add_User = async (req, res) => {
    if(
        !req.body.first_name ||
        !req.body.last_name ||
        !req.body.email ||
        !req.body.password

    ) {
        res.status(400).json({ error: 'Missing Fields Bitch'})
    }
    const passwordhash = await bcrypt.hash(req.body.password, 5)

    try {
        const first_name = req.first_name
        const last_name = req.last_name
        const email = req.email
        passwordhash
        const sql = `INSERT INTO User(first_name, last_name, email, password) VALUES (?,?,?,?)`
        const values = [ first_name, last_name, email, passwordhash]
        const [rows] = await pool.query(sql, values)
        res.json(rows)
    } catch (err) {
        console.log(err.stack)
    }
}
module.exports = { Add_User }