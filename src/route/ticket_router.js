const database = require('../database/database_client')
const express = require('express')

const checkTicketValid = async (req, res) => {
    if (!req.query.id) {
        res.status(400).send('No ticket ID supplied!')
        return null
    }

    const id = req.query.id
    const ticket = await database.findTicketById(id)

    if (ticket == null) {
        res.status(500).send('No ticket found with that ID!')
        return null
    }

    return ticket
}

module.exports = express.Router().get('/ticket', async (req, res) => {
    const ticket = checkTicketValid(req, res)

    if (ticket != null) {
        res.json(ticket)
    }
}).post('/ticket', async (req, res) => {
    const ticket = await checkTicketValid(req, res)

    if (ticket != null) {
        const data = req.body

        if (!data.message) {
            res.status(400).send("No message supplied!")
            return
        }

        await database.updateTicket({
            id: ticket['id']
        }, {
            $push: {
                messages: {
                    sent_at: Date.now(),
                    author: req.username,
                    message: data['message']
                }
            }
        })

        res.status(200).send("Successfully sent message")
    }
})