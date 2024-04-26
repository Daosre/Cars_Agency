const { pool } = require('../Connexion/Db')
const express = require('express')
const path = require('path')
const multer = require('multer')
const { type } = require('os')
const app = express()
const uploadDirectory = path.join(__dirname, 'uploads')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


//Convertion de l'image data en apparition dans le front.
async function Add_Cars (req,res) {
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadDirectory)
        },
        filename: function (req, file, cb) {
            cb(null, `${file.fieldname}-${Date.now()}.jpg`)
        }
    })
    //Format de l'image MAXIMUM
    const maxSize = 3 * 1000 * 1000
    let upload = multer({
        storage: storage,
        limits: { fileSize: maxSize},
        fileFilter: function (req, file,cb) {
            let typefile = /jpeg|jpg|png/
            let mimetype = typefile.test(file.mimetype)
            let extname = typefile.test(
                path.extname(file.originalname).toLowerCase()
            )
            if( mimetype && extname) {
                return cb(null, true)
            }
            //Message d'erreur si le type de fichier est pas bon.
            cb(
                'Error: File Upload only suports the' + 'following typefile -' + typefile
            )
        }
    }).single('image')

    upload(req,res, function (err) {
        if(err) {
            res.send(err)
        } else {
            res.send('Suess, Image Uploaded')
        }
    })

    try {
        const sql = ` SELECT * FROM image`
        const [result] = await pool.query(sql)
        res.status(200).json ({ result })
        return

    } catch (err) {
        console.log(err.stack)
        res.status(500).json({ message: 'Error Server'})
    }
}

module.exports = { Add_Cars }