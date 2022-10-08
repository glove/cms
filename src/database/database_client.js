const { MongoClient } = require('mongodb')
const { Cache } = require('js-cache');

const bcrypt = require('bcrypt')

const cache = new Cache();

let client
let db
let users

const connect = async () => {
    client = new MongoClient(process.env.MONGO_URI)

    await client.connect().then(() => {
        db = client.db(process.env.DB)
        users = db.collection(process.env.COLLECTION)
    })
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
    await users.updateOne(filter, updateDocument, {
        upsert: true
    })
}

const createUser = async (email, password) => {
    const salt = await bcrypt.genSalt(10)

    await users.insertOne({
        email: email,
        hash: await bcrypt.hash(password, salt),
        salt: salt
    })
}

module.exports = {
    client,
    users,

    connect,

    findUserByCookie,
    findUserByEmail,
    saveUser,
    createUser
}