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
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let email = req.body.email
    let password = req.body.password

    try {
        const values = [email]
        const sql = `SELECT email FROM User WHERE email=?`
        const [result] = await pool.execute(sql, values)
        if(result.length !== 0) {
            res.status(400).json({ error: 'Invalid credit'})
        } else {
            const passwordhash = await bcrypt.hash(password, 10)
            const sqlInsertRequest = `INSERT INTO User(first_name, last_name, email, password) VALUES (?,?,?,?)`
            const insertValues = [first_name, last_name, email, passwordhash]
            const [result] = await pool.execute(sqlInsertRequest, insertValues)
            if (result.affectedRows > 0) {
                res.status(200).json({ sucess: 'Register Success'})
                return
            } else {
                res.status(500).json({ error: 'Register Failed'})
                return
            }
        }
    } catch (err) {
        console.log(err.stack)
        res.status(500).json({ msg: 'Erreur serveur'})
    }
}

async function Log_User (req,res) {
    if(!req.body.identifier || !req.body.password) {
        res.status(400).json({ error: 'Invalid Credits'})
        return
    }
    let identifier = req.body.identifier
    let password = req.body.password

    try {
        const values = [identifier, identifier]
        const sql = `SELECT * FROM User JOIN role ON User.id_role = role.id_role where email=?`
        const [result] = await pool.query(sql, values)

        if(result.length === 0) {
            res.status(401),json({ error: 'Invalid credits'})
            return
        } else {
            await bcrypt.compare(password, result[0].password,
            function (err, bcryptresult) {
                if(err) {
                    res.status(401).json({ erro: 'Invalid credit'})
                    return
                }
                const token = jwt.sign(
                    {
                        email: result[0].email,
                        id: result[0].id
                    },
                    process.env.MA_SECRETKEY, 
                    { expiresIn: '20d'}
                )
                res.status(200).json({ jwt: token, role: result[0].name_role})
            })
        } 
            }catch (err) {
                res.status(500).json({ msg: 'Error Server'})
            }
}

async function All_Users (req, res) {
    try {
        const sql = `SELECT id, first_name, last_name FROM User`
        const [result] = await pool.query(sql)
        res.status(200).json({ result })
        return
    } catch (err) {
        console.log(err.stack)
        res.status(500).json({ message: "Serveur Error"})
    }
}
module.exports = { Add_User, Log_User, All_Users }