const database = require('../database/database_client')

const generateCookie = require('../cookie/cookie_generator')
const express = require('express')
const bcrypt = require('bcrypt')

module.exports = express.Router().get('/login', async (req, res) => {
    res.render('login')
}).post('/login', async (req, res) => {
    const data = req.body

    if (!data.email || !data.password) {
        res.status(400)
        return
    }

    const email = data.email
    const password = data.password

    const user = await database.findUserByEmail(email)

    if (user === null) {
        res.status(403).send('Unable to log in!')
        return
    }

    const salt = user['salt']
    const hash = await bcrypt.hash(password, salt)

    if (hash === user['hash']) {
        const cookie = generateCookie()
        user['cookie'] = cookie

        await database.saveUser({
            email: user['email']
        }, {
            $set: {
                cookie: cookie
            }
        })
        res.cookie('sessionId', cookie)
    }

    res.status(200)
        .send('Successfully logged in!')
})