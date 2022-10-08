const { MongoClient } = require('mongodb')
const { Cache } = require('js-cache');

const cache = new Cache();

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

const saveUser = async (filter, updateDocument) => {
    await users.update(filter, updateDocument, {
        upsert: true
    })
}

module.exports = {
    client,
    users,

    connect,

    findUserByCookie,
    findUserByEmail,
    saveUser
}