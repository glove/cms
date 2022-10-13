const { MongoClient } = require('mongodb')
const { Cache } = require('js-cache')

const bcrypt = require('bcrypt')

const cache = new Cache()

let client
let db

let users
let tickets
let customers

const connect = async () => {
    client = new MongoClient(process.env.MONGO_URI)

    await client.connect().then(() => {
        db = client.db(process.env.DB)

        users = db.collection(process.env.COLLECTION)
        tickets = db.collection(process.env.TICKET_COLLECTION)
        customers = db.collection(process.env.CUSTOMERS_COLLECTION)
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
    return user
}

const findUserByEmail = async (email) => {
    return await users.findOne({
        email: email
    })
}

const findUserByUsername = async (username) => {
    return await users.findOne({
        username: username
    })
}

const findTicketsByUsername = async (username) => {
    return await tickets.find({
        csr: username,
        status: "open"
    }).toArray()
}

const findTicketById = async (id) => {
    return await tickets.findOne({
        id: id
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

const updateTicket = async (filter, updateDocument) => {
    await tickets.updateOne(filter, updateDocument, {
        upsert: true
    })
}

const createUser = async (username, email, password, role) => {
    const salt = await bcrypt.genSalt(10)

    await users.insertOne({
        username: username,
        email: email,
        hash: await bcrypt.hash(password, salt),
        salt: salt,
        role: role
    })
}

const queryCustomers = async (query) => {
    return customers.find(query).toArray()
}

const getStatistics = async (username) => {
    return {
        "total_users": await users.count(),
        "active_tickets": await tickets.countDocuments({
            "status": "open"
        }),
        "assigned_tickets": await tickets.countDocuments({
            "csr": username
        }),
        "total_customers": await customers.count(),
        "total_csrs": await users.countDocuments({
            "role": "csr"
        }),
        "total_admins": await users.countDocuments({
            "role": "admin"
        })
    }
}

module.exports = {
    client,
    users,
    tickets,
    customers,

    connect,

    findUserByCookie,
    findUserByEmail,
    findUserByUsername,
    findTicketsByUsername,
    findTicketById,
    updateTicket,
    queryCustomers,
    getStatistics,

    saveUser,
    createUser
}