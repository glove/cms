module.exports = async (req, res, next) => {
    req.csr = true
    req.admin = true
    req.username = 'admin'
    req.role = 'admin'
    next()
}