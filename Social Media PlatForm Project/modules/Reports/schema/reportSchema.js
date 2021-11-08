const mongoose = require("mongoose")

const reportSchema = new mongoose.Schema({

    userID:{type:String,required:true,ref:"user"}, 
    postID:{type:String,required:true,ref:"post"},
    reportComment:{type:String,required:true}
},
{
    timestamps:true
})

module.exports = {
    reportSchema
}

