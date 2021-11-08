const reportServer = require("express").Router()
const validateRequest = require("../../../common/middleWare/validateRequest")
const isAuthorized = require("../../../common/middleWare/isAuthorized")
const { USER_POSTS, REPORTS } = require("../../users/endPoints")
const { addReport, deleteReport, getAllReports } = require("../controller/reportController")
const {idSchema} = require('../../users/joi/userValidation');
const { addRepSchema } = require("../joi/reportsValidation")

reportServer.get("/getAllReports",isAuthorized(REPORTS),getAllReports)
reportServer.post("/addReport",validateRequest(addRepSchema),isAuthorized(USER_POSTS),addReport)
reportServer.delete("/deleteReport/:id",validateRequest(idSchema),isAuthorized(REPORTS),deleteReport)



module.exports = reportServer;