const { getAllUsers } = require('../controller/userController')

const userRoutes = require('express').Router()



userRoutes.get('/getAllUsers',getAllUsers)

module.exports = userRoutes