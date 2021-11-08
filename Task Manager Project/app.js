const express = require("express")
const app = express()
const connection = require('./common/dbConfig/connection')
const router = require("./modules/tasks/routes/taskRouter")
const notFound=require("./common/notFound/notFound")
require("dotenv").config()

const port = process.env.PORT
app.use(express.static('./public'));

app.use(express.json())

connection()

app.use('/api/v1/tasks',router);

app.use(notFound)

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});