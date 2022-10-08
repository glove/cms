const database = require('../database/database_client')
const express = require('express')

module.exports = express.Router().post('/create', async (req, res) => {
    const data = req.body;

    if (!data.email || !data.password || !data.role) {
        res.status(400).send('Missing fields!')
        return
    }

    if (!req.admin) {
        res.status(401).send('No permission!')
        return
    }

    const email = data.email
    const password = data.password
    const role = data.role

    if (await database.findUserByEmail(email) !== null) {
        res.status(400).send('A user with that email already exists!')
        return
    }

    await database.createUser(email, password, role)

    res.status(200).send('Successfully created user!')
})