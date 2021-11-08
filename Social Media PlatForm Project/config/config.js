const mongoose = require('mongoose')

const connection = ()=>{

    return mongoose.connect(process.env.QUERY_STRING)
    .then((result)=>{
    console.log("DB Connected");})
    .catch((err)=>{
    console.log("ERROR DB is Not Connected");})
}
module.exports = connection;