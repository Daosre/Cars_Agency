const { pool } = require('../Connexion/Db')
const express = require('express')
const path = require('path')
const multer = require('multer')
const { extracToken } = require('./Utils/token')
const app = express()
const uploadDirectory = path.join(__dirname, 'uploads')
const jwt = require('jsonwebtoken')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const insertCarImage = async (req, res) => {
  let newFileName
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDirectory)
    },
    filename: function (req, file, cb) {
      newFileName = `${file.fieldname}-${Date.now()}.jpg`
      cb(null, newFileName)
    },
  })

  const maxSize = 3 * 1000 * 1000

  let upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
      var filetypes = /jpeg|jpg|png/
      var mimetype = filetypes.test(file.mimetype)

      var extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      )

      if (mimetype && extname) {
        return cb(null, true)
      }

      cb(
        'Error: File upload only supports the ' +
          'following filetypes - ' +
          filetypes
      )
    },
  }).single('image')

  upload(req, res, function (err) {
    if (err) {
      res.send(err)
    } else {
      res.send({ newFileName: newFileName })
    }
  })
}

const insertCar = async (req, res) => {
    // const token = await extracToken(req)
    // jwt.verify( token,
    //     process.env.MA_SECRET_KEY,
    // async (err, authData) => {
    //     if(err) {
    //         res.status(401).json({ err: 'Unauthorized'})
    //         return
    //     } else {
  if (
    !req.body.name ||
    !req.body.quantity ||
    !req.body.description ||
    !req.body.price ||
    !req.body.image
) {
    res.status(400).send({ error: 'Missing fields' })
  }

  try {
    let name = req.body.name
    let quantity = req.body.quantity
    let description = req.body.description
    let price = req.body.price
    let image = req.body.image
    const sql = `INSERT INTO Cars(name, quantity, description, price, image) VALUES (?,?,?,?,?)`
    const values = [name, quantity, description, price, image ]
    console.log(sql)
    const [result] = await pool.query(sql,values)
    res.status(200).json({ result })
    return
  } catch (error) {
    console.log(error.stack)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}
// })
// }
 const Delete_Cars = async (req, res) => {
        let name = req.body.name
        const rows = `DELETE FROM Cars WHERE cars_name = ?`
        const values = [name]
        const [result] = await pool.execute(rows, values)
        console.log(result)
        res.status(200).json({ msg: 'Deleted'})
 }
module.exports = { insertCarImage, insertCar, Delete_Cars }
