const express = require('express')
const notFound = require('./common/notfound')
const connectdb = require('./db/connection')
const jobServer = require('./modules/jobs/routes/jobRoutes')
const userServer = require('./modules/users/routes/userRoutes')

const app = express()
require('dotenv').config()
app.use(express.json())
app.use('/auth',userServer)
app.use('/jobs',jobServer)

port = process.env.PORT 
const start = ()=>{
try {
    connectdb(process.env.URI)
    app.listen(port, () => {
        console.log(`App listening on port ${port}...!`);
    });
} catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({msg:"error Happened",error})
}
}
start()

app.use(notFound)