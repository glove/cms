const { MongoClient } = require('mongodb')

let client
let db
let users

const connect = () => {
    client = new MongoClient(process.env.MONGO_URI)

    db = client.db(process.env.DB)
    users = db.collection(process.env.COLLECTION)
}

const findUserByCookie = async (cookie) => {
    return await users.findOne({
        cookie: cookie
    })
}

const findUserByEmail = async (email) => {
    return await users.findOne({
        email: email
    })
}

module.exports = {
    client,
    db,
    users,

    connect,

    findUserByCookie,
    findUserByEmail
}