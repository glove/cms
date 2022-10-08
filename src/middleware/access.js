const database = require('../database/database_client')

module.exports = async (req, res, next) => {
    req.admin = false
    req.csr = false

    if (req.cookies && req.cookies['sessionId']) {
        const cookie = req.cookies['sessionId']
        const user = await database.findUserByCookie(cookie)

        if (user['role'] === 'admin') {
            req.admin = true
            req.csr = true
        } else if (user['role'] === 'csr') {
            req.csr = true
        }
    }

    next();
}