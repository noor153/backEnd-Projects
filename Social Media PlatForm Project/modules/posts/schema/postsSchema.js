const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const postsSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    createdBy:{type:Object,ref:"user"},
    blocked:{type:Boolean,default:false},
},
{
    timestamps:true
})

module.exports = postsSchema;

