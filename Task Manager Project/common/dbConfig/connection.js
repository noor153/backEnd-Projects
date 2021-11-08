const mongoose = require("mongoose")

const connection = ()=>{

    return mongoose.connect(process.env.QUERY_DEPLOY,{useUnifiedTopology: true,useNewUrlParser: true}).then(()=>{
        console.log("db connected");
    }).catch(()=>{
        console.log("db connection failed!!");

    })


}

module.exports = connection;