async function toktok(req) {
    const headerWithToken = req.headers.authorization
    // " !== " strictement différent
    if (typeof headerWithToken !== undefined || !headerWithToken) {
        const bearer = headerWithToken.split(' ')
        const token = bearer[1]
        return token
    }
}
module.exports = { toktok }