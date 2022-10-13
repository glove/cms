const database = require('../database/database_client')
const express = require('express')

module.exports = express.Router().get('/login', async (req, res) => {
    res.render('pages/login')
}).get('/tickets', async (req, res) => {
    res.render('pages/tickets', {
        tickets: await database.findTicketsByUsername(req.username),
    })
}).get('/users', async (req, res) => {
    res.render('pages/users')
}).get('/profile', async (req, res) => {
    res.render('pages/profile', {
        username: req.username,
    })
}).get('/ticket', async (req, res) => {
    if (!req.query.id) {
        res.status(404).send('Ticket not found!')
        return
    }

    const ticket = await database.findTicketById(req.query.id);

    if (ticket.csr !== req.username) {
        res.status(403).send('You don\'t have permission to view this ticket!')
        return
    }

    console.log(ticket)

    res.render('pages/ticket', {
        ticket: ticket
    })
})