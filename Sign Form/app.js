const express = require("express")
const connection = require("./config/db")
const userServer = require("./modules/users/routes/usesRoutes")
const app = express()
const cors = require("cors")
require('dotenv').config()
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

PORT = process.env.PORT || 4600
app.use(express.json())
app.use(express.static("./front"))
app.use(userServer)

const start = ()=>{
    connection();
    app.listen(PORT,()=>{
        console.log(`Hello on ${PORT}!`);
    })
}
start()