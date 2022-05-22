const { getAllTransfers,AddTrans } = require('../controller/transController')

const TransFersRoute = require('express').Router()

TransFersRoute.get("/getAllTrans",getAllTransfers)
TransFersRoute.post("/AddTrans",AddTrans)

module.exports = TransFersRoute