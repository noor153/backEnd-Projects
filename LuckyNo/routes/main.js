const { dashboard , login } = require('../controllers/main')
const auth = require('../middleware/auth')
const mainServer = require('express').Router()

mainServer.get('/dashboard',auth(),dashboard)
mainServer.post('/login',login)

module.exports = mainServer