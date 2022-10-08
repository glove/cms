const database = require('../database/database_client')

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

    const salt = data.salt
    console.log(await bcrypt.hash(password, salt))
})