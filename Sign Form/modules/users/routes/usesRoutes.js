const { signUp,signIn } = require('../controller/usersController')
const validator = require("../../../common/validator")
const { signUpSchema, signInSchema } = require('../joi/userSchema')
const userServer = require('express').Router()

userServer.post("/signUp",validator(signUpSchema),signUp)
userServer.post("/signIn",validator(signInSchema),signIn)
 

module.exports = userServer