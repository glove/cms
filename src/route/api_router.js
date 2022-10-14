const database = require('../database/database_client')
const express = require('express')

module.exports = express.Router().post('/create', async (req, res) => {
    const data = req.body

    if (!data.email || !data.password || !data.role || !data.username) {
        res.status(500).send('Missing fields!')
        return
    }

    if (!req.admin) {
        res.status(401).send('No permission!')
        return
    }

    const username = data.username
    const email = data.email
    const password = data.password
    const role = data.role

    if (await database.findUserByEmail(email) !== null) {
        res.status(400).send('A user with that email already exists!')
        return
    }

    if (await database.findUserByUsername(username) !== null) {
        res.status(400).send('A user with that username already exists!')
        return
    }

    await database.createUser(username, email, password, role)

    res.status(200).send('Successfully created user!')
}).get('/tickets', async (req, res) => {
    const active_tickets = []
    const tickets = await database.findTicketsByUsername(req.username)

    for (let ticket of tickets) {
        if (ticket['status'] !== 'open') {
            continue
        }

        active_tickets.push({
            id: ticket['id'],
            assigned_csr: ticket['csr'],
            opened_at: ticket['date']
        })
    }

    res.json(active_tickets)
}).post('/customers', async (req, res) => {
    const data = req.body
    let query

    switch (data['type']) {
        case 'address':
            query = {address: data['query']}
            break
        case 'email':
            query = {email: data['query']}
            break
        case 'phone':
            query = {phone: data['query']}
            break
        case 'name':
            query = {name: data['query']}
            break
    }

    if (query === undefined) {
        res.json([])
        return
    }

    res.json(await database.queryCustomers(query))
}).get('/stats', async (req, res) => {
    res.json(await database.getStatistics(req.username))
}).post('/namechange', async (req, res) => {
    const data = req.body

    if (!data.username) {
        res.status(400).send('No username provided!')
        return
    }

    await database.updateName(req.username, data.username)
    res.status(200).send('Successfully updated username!')
})