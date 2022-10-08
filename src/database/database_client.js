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
    let user
    if ((user = cache.get(cookie)) === undefined) {
        user = await users.findOne({
            cookie: cookie
        })
        cache.set(cookie, user)
    }
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

    if (filter['cookie']) {
        const cookie = filter['cookie']
        cache.del(cookie)
    }
}

const createUser = async (email, password, role) => {
    const salt = await bcrypt.genSalt(10)

    await users.insertOne({
        email: email,
        hash: await bcrypt.hash(password, salt),
        salt: salt,
        role: role
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