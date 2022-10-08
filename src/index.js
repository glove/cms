//Express and essential imports
const express = require('express')
const path = require('path')
const fs = require('fs')

const https = require('https')
const http = require('http')

//Middleware
const access = require('./middleware/access')
const compression = require('compression')
const cookieParser = require('./middleware/cookie_parser')
const cors = require('cors')
const helmet = require('helmet')
const rateLimiting = require('./middleware/rate_limiting')

//Routing
const loginRouter = require('./route/login_route')

require('dotenv').config({
    path: path.join(__dirname, '../env/variables.env')
})

const databaseClient = require('./database/database_client')

const restrictAccess = process.env.ACCESS_RESTRICTION === 'true'
const useHttps = process.env.HTTPS === 'true'
const useRateLimiting = process.env.RATE_LIMITING === 'true'
const useViewCache = process.env.VIEW_CACHE === 'true'

const port = process.env.PORT

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(cookieParser)
app.use(compression())
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: [ `'self'` ],
        scriptSrc:  [ `'self'`, `'unsafe-eval'`,
            `https://www.google.com/recaptcha/`,
            `https://www.gstatic.com/recaptcha/releases/`,
            `https://kit.fontawesome.com/`,
            `https://cdn.jsdelivr.net/npm/axios/dist/`],
        styleSrc: [ `'self'`, `'unsafe-inline'`,
            `https://kit.fontawesome.com`,
            `https://fonts.googleapis.com` ],
        fontSrc: [ `'self'`,
            `https://fonts.googleapis.com`,
            `https://fonts.gstatic.com/s/roboto/v30/`,
            `https://fonts.gstatic.com/s/opensans/v34/`,
            `https://ka-f.fontawesome.com/releases/v6.2.0/webfonts/` ],
        connectSrc: [ `'self'`,
            `https://ka-f.fontawesome.com` ]
    }
}))

app.use(express.static(path.join(__dirname, 'static')))

if (useRateLimiting) {
    app.use('/api', rateLimiting)
}

if (useViewCache) {
    app.enable('view cache')
}

if (restrictAccess) {
    app.use(access);
}

app.disable('x-powered-by')

app.use('/', loginRouter);

const main = async () => {
    if (useHttps) {
        https.createServer({
            key: fs.readFileSync(path.join(__dirname, '../encryption/cert_key.key')),
            cert: fs.readFileSync(path.join(__dirname, '../encryption/cert_pem.pem')),
        }, app).listen(port)
    } else {
        http.createServer(app).listen(port)
    }
}

main().then(() => {
    console.log('Connecting to database...')
    databaseClient.connect()
    console.log('Connected to database!')

    console.log('Started ' + (http ? 'HTTP' : 'HTTPS') + ' server on port ' + port + '!')
})