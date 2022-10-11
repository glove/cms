const express = require('express')

module.exports = express.Router().get('/dashboard', async (req, res) => {
    res.render('pages/dashboard', {
        name: req.username,
        role: req.role
    })
})