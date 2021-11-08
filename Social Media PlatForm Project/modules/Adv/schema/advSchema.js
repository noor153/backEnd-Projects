const mongoose = require("mongoose")

const advSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
},
{
    timestamps:true
})

module.exports = {
    advSchema
}