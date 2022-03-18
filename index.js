const express = require('express')
const knex = require('knex')

const app = express()
const port = "3000"
app.listen(() => {console.log(`Listening to port ${port}.`)})

