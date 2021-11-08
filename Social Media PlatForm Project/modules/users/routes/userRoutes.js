const server = require('express').Router()
const validateRequest = require('../../../common/middleWare/validateRequest');
const {getAllUsers, signUp, signIn, getAdmins, addAdmin, deleteAdmin, deActivate, block, updatePassWord, updateUser } = require('../controller/userController');
const { addUserSchema, signInSchema, addAdminSchema, idSchema, updateUserSchema, updatePasswordSchema } = require('../joi/userValidation');
const isAuthorized = require("../../../common/middleWare/isAuthorized")
const { GET_ALL_USERS, GET_ALL_ADMINS, ADD_ADMINS, DELETE_ADMINS, BLOCK_USER, UPDATE_USERS } = require('../endPoints');

server.get("/",isAuthorized(GET_ALL_USERS),getAllUsers)
server.get("/getAdmins",isAuthorized(GET_ALL_ADMINS),getAdmins)
server.post("/signUp",validateRequest(addUserSchema),signUp)
server.post("/signIn",validateRequest(signInSchema),signIn)
server.post("/addAdmin",validateRequest(addAdminSchema),isAuthorized(ADD_ADMINS),addAdmin)
server.post("/deleteAdmin/:id",validateRequest(idSchema),isAuthorized(DELETE_ADMINS),deleteAdmin)
server.post("/deActivate/:id",validateRequest(idSchema),isAuthorized(UPDATE_USERS),deActivate)
server.post("/blockUser/:id",validateRequest(idSchema),isAuthorized(BLOCK_USER),block)
server.post("/updatePassWord",validateRequest(updatePasswordSchema),isAuthorized(UPDATE_USERS),updatePassWord)
server.post("/updateUser",validateRequest(updateUserSchema),isAuthorized(UPDATE_USERS),updateUser)


module.exports = server;