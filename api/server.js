require('dotenv').config()
require('./database/init')

const Enforcer = require('openapi-enforcer')
const EnforcerMiddleware = require('openapi-enforcer-middleware')
const express = require('express')
const path = require('path')
const Accounts = require('./controllers/account')
const Tasks = require('./controllers/tasks')

const app = express()

// Any paths defined in your openapi.yml will validate and parse the request
// before it calls your route code.
const openapiPath = path.resolve(__dirname, '../openapi.yml')
const enforcerPromise = Enforcer(openapiPath, { hideWarnings: true })
const enforcerMiddleware = EnforcerMiddleware(enforcerPromise)

app.use(express.json())

// app.use((req, res, next) => {
//   console.log(req.method + ' ' + req.path, req.headers, req.body)
//   next()
// })

app.use(enforcerMiddleware.init({ baseUrl: '/api' }))

// Catch errors
enforcerMiddleware.on('error', err => {
  	console.error(err)
  	process.exit(1)
}) 

app.use(enforcerMiddleware.route({
	accounts: Accounts,
	tasks: Tasks
}))

// add fallback mocking middleware here
app.use(enforcerMiddleware.mock())

module.exports = app