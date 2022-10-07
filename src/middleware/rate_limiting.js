const rateLimit = require('express-rate-limit')

module.exports = () => {
    return rateLimit({
        windowMs: 1000,
        max: 2,
        standardHeaders: true,
        legacyHeaders: false,
    })
}
