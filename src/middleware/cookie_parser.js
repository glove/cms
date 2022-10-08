module.exports = (req, res, next) => {
    const cookies = req.headers.cookie

    if (cookies !== undefined) {
        req.cookies = cookies.split(";").reduce((obj, c) => {
            const n = c.split("=")

            obj[n[0].trim()] = n[1].trim()
            return obj
        }, {})
    }

    next()
}