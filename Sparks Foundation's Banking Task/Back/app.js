const express = require('express');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const TransFersRoute = require('./modules/transfers/routes/transRoute');
const userRoutes = require('./modules/users/routes/userRoutes');
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var cors = require('cors');
const connection = require('./common/db');
connection();
app.use(cors())
const path = require('path');

const port = 3000
app.use(express.json())
app.use(express.static('/Users/nooreldeen/Desktop/Web/Sparks/Front'));


app.use(TransFersRoute)
app.use(userRoutes)

// app.use('/', express.static(__dirname + "/index_style.css"));
// app.get('/', (req, res) => res.sendFile( "/Users/nooreldeen/Desktop/Web/Sparks/Front/Html/transfer.html"))
// app.get('/viewCustomers.html',(req,res)=> res.sendFile("/Users/nooreldeen/Desktop/Web/Sparks/Front/Html/viewCustomers.html"))
// app.get('/transfer.html',(req,res)=> res.sendFile("/Users/nooreldeen/Desktop/Web/Sparks/Front/Html/transfer.html"))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))