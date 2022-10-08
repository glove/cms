const database = require('../database/database_client')
const express = require('express')

module.exports = express.Router().get('/ticket', async (req, res) => {
    if (!req.query.id) {
        res.status(400).send('No ticket ID supplied!')
        return
    }

    const id = req.query.id
    const ticket = await database.findTicketById(id)

    if (ticket == null) {
        res.status(500).send('No ticket found with that ID!')
        return
    }

    res.json(ticket)
})