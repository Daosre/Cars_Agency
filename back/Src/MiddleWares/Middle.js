let validator = require('validator')

const verifData = async (req, res, next) => {
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    if(!validator.isAlpha(first_name && last_name)) {
        return res.json({ msg: 'Name need only letters'})
    }
    if(!validator.isEmail(email)) {
        return res.json({ msg: 'Only Email autorized'})
    }
    req.first_name = first_name
    req.last_name = last_name
    req.email = email
    next();
}

module.exports = { verifData }