const express = require('express')
const { register, login } = require('../controller/userController')
const { loginValidation, registerValidation } = require('../joi/userValidations')
const userServer =  express.Router()
const joiValidation = require('../../../common/validation')

userServer.post('/login',joiValidation(loginValidation),login)
userServer.post('/register',joiValidation(registerValidation),register)

module.exports = userServer