const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const path = require('path')

//controller
const admin = require('./controllers/admin.js')
const signin = require('./controllers/signin.js')
const register = require('./controllers/register.js')
const profile = require('./controllers/profile.js')
const image = require('./controllers/image.js')

const databaselocal = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'root',
    database: 'smartbrain',
  },
})
const databaseheroku = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
})

// const db = databaselocal;
const db = databaseheroku

const app = express()
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )

  next()
})
app.use(bodyParser.json())
app.use(cors())

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client/build')))

//   app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
//   })
// }

app.get('/', (req, res) => {
  res.json('PostgreSql from github')
})
app.get('/admin', (req, res) => admin.adminHandler(req, res, db))
app.post('/signin', (req, res) => signin.signInHandler(req, res, db, bcrypt))
app.post('/register', (req, res) =>
  register.handleRegister(req, res, db, bcrypt)
)
app.get('/profile/:id', (req, res) => profile.profileHandler(req, res, db))
app.put('/image', (req, res) => image.imageHandler(req, res, db))
app.post('/apiCall', (req, res) => image.apiHandler(req, res))

app.listen(process.env.PORT || 3002, () => {
  console.log(`App is Running on Port ${process.env.PORT} or 3002`)
})
