const { pool } = require('../Connexion/Db')

async function All_Model (req, res) {
    try {
    const sql = ` SELECT * FROM Model`
    const [result] = await pool.query(sql)
    res.status(200).json({ result })
    } catch (err) {
        console.log(err.stack)
        res.status(500).json({ message: 'Serveur Error'})
    }
}

module.exports = { All_Model }