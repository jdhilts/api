const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const pg = require('knex/knex')
const PORT = process.env.PORT || 3000
const cors = require('cors')
const createAccount = require('./controllers/checkEmail')

const app = express()
//Create corsOptions before deploying to production.
app.use(cors(corsOptions = {
        origin: 'https://floating-taiga-61002.herokuapp.com',
        methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res)=> res.send('Hello User'))
app.post('/create_account', (req, res)=> createAccount.checkEmail(req, res, pg, bcrypt))
app.get('/login', (req, res)=> res.send('This is the Login Page.'))

app.listen(PORT,() => {console.log(`Listening to port ${PORT}.`)})

