const express = require('express');
const bodyParser = require('body-parser')

const TransFersRoute = require('./modules/transfers/routes/transRoute');
const userRoutes = require('./modules/users/routes/userRoutes');
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var cors = require('cors');
const connection = require('./common/db');
connection();
app.use(cors())

const port = 3000
app.use(express.json())

app.use(express.static("../Front"));


app.use(TransFersRoute)
app.use(userRoutes)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))