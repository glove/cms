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

        req.role = user['role']
        req.username = user['username']
    }

    if (req.path.startsWith('/api') && !req.csr) {
        res.status(403).send('No permission!')
        return
    }

    next()
}