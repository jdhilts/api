const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const knex = require('knex')
//const cors = require('cors')
const createAccount = require('./controllers/checkEmail')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
const port = 3000

const pg = knex({
        client: 'pg',
        version: '8.7.3',
        connection:{
                host: '127.0.0.1',
                user: 'jameshilts',
                password: '',
                database: 'users_testdb'
        }
})

//Create corsOptions before deploying to production.
//const corsOptions({})
//app.use(cors)

app.get('/', (req, res)=> res.send('Hello User'))
app.post('/create_account', (req, res)=> createAccount.checkEmail(req, res, pg, bcrypt))
app.get('/login', (req, res)=> res.send('This is the Login Page.'))

app.listen(port,() => {console.log(`Listening to port ${port}.`)})

