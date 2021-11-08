// Requires & Declarings
const express = require('express')
require("dotenv").config()
const connectDB=require("./db/connect")
const app = express()
const port = process.env.PORT
const notFound = require("./middleware/not-found")
const ProductServer = require('./routes/products')
//MiddleWares

app.use(express.json())

//Routes
app.get('/', (req, res) => {
    res.send("<h1>STORE APi</h1><a href='/api/v1/products'>Products</a>");
});
app.use('/api/v1/products',ProductServer)
app.use(notFound)
//db Connection & server Start
const start = async () => {
    try {
      // connectDB
      await connectDB(process.env.QUERY_DEPLOY);
      app.listen(port, () => console.log(`Server is listening port ${port}...`));
    } catch (error) {
      console.log(error);
    }
  };
  start();