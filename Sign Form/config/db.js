const mongoose = require("mongoose")

const connection = ()=>{
    return mongoose.connect(process.env.DB_Deploy).then((result)=>{
        console.log("Db is connected");
    }).catch(()=>{
        console.log("Error in Db Connection");
    })
}

module.exports = connection 