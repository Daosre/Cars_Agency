const { pool } = require('../Connexion/Db')

async function AddCars (req, res) {
    try {
        const name = req.body.name
        const quantity = req.body.quantity
        const description = req.body.description
        const price = req.body.price
        const image = req.body.image
        const modelid = req.body.model
        const sql = `INSERT INTO Cars (name, quantity, description, price, image) VALUES (?,?,?,?,?)`
        const values = [name, quantity, description, price, image]
        const [result] = await pool.query(sql, values)
        console.log(result)
        const model_id = result.insertId
        const [resultModel] = await pool.query(`INSERT INTO Model VALUES (?,?) `,
    [model_id, modelid ]);
    res.json({ msg: 'Cars Added'})
    } catch (err) {
        console.log(err.stack)
    }
}

module.exports = { AddCars }