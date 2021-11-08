const advServer = require("express").Router()
const validateRequest = require('../../../common/middleWare/validateRequest');
const isAuthorized = require("../../../common/middleWare/isAuthorized");
const { getAllAdv, addAdv, deleteAdv, updateAdv } = require("../controller/advController");
const { editAdvSchema, deleteAdvSchema, addAdvSchema } = require("../joi/advValidation");
const { ADD_ADV, DELETE_ADV, UPDATE_ADV } = require("../../users/endPoints");

advServer.get("/getAllAdv",getAllAdv)
advServer.post("/addAdv",isAuthorized(ADD_ADV),validateRequest(addAdvSchema),addAdv)
advServer.delete("/deleteAdv/:id",isAuthorized(DELETE_ADV),validateRequest(deleteAdvSchema),deleteAdv)
advServer.post("/updateAdv/:id",isAuthorized(UPDATE_ADV),validateRequest(editAdvSchema),updateAdv)

module.exports = advServer;