const express = require('express')
const router = express.Router()

module.exports = router.get('/login', async (req, res) => {
    res.render('pages/login')
}).get('/tickets', async (req, res) => {
    res.render('pages/tickets')
}).get('/users', async (req, res) => {
    res.render('pages/users')
}).get('/profile', async (req, res) => {
    res.render('pages/profile', {
        username: req.username,
    })
})