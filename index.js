const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const pg = require('knex')(config)
const PORT = process.env.PORT || 3000
const cors = require('cors')
const createAccount = require('./controllers/checkEmail')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//Create corsOptions before deploying to production.
const corsOptions = {
        origin: 'https://floating-taiga-61002.herokuapp.com',
        methods: 'OPTIONS, POST',
        preflightContinue: false,
        optionsSuccessStatus: 200
}


app.get('/', (req, res)=> res.send('Hello User'))
app.post('/create_account', app.use(cors(corsOptions)), (req, res)=> createAccount.checkEmail(req, res, pg, bcrypt))
app.get('/login', (req, res)=> res.send('This is the Login Page.'))

app.listen(PORT,() => {console.log(`Listening to port ${PORT}.`)})

