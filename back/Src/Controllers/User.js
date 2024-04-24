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

async function Log_User (req,res) {
    if(!req.body.email || !req.body.password) {
        res.status(400).json({ error: 'Invalid Credits'})
        return
    }

        const email = req.body.email
        const sql = `SELECT * FROM User where email=?`
        const values = [email]
        const [rows] = await pool.query(sql, values)

        const isValidPassword = bcrypt.compareSync(req.body.password, rows[0].password)
        if(!isValidPassword) {
            res.status(401).json({ error: 'Password Wrong'})
        } else {
            const token = jwt.sign(
                {
                    first_name: rows[0].first_name,
                    last_name: rows[0].last_name,
                    email: rows[0].email,
                    role: rows[0].role,
                    id: rows[0].id,
                    gdpr: new Date(rows[0].gdpr).toLocaleDateString('fr')
                },
                process.env.MA_SECRETKEY,
                { expiresIn: '10d'}
            )
            res.status(200).json({ jwt: token})
        }
}
module.exports = { Add_User, Log_User }