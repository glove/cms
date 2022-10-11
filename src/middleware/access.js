const database = require('../database/database_client')
const protectedEndpoints = ['/tickets', '/profile', '/users', '/api']
const adminEndpoints = ['/admin']

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

    for(let endpoint of protectedEndpoints) {
        if (req.path.startsWith(endpoint) && !req.csr) {
            res.status(403).send('No permission!')
            return
        }
    }

    for(let endpoint of adminEndpoints) {
        if (req.path.startsWith(endpoint) && !req.admin) {
            res.status(403).send('No permission!')
            return
        }
    }

    next()
}