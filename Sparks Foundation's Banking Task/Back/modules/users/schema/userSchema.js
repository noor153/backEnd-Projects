const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,required:true},
    age:{type:String,required:true},
    currentBalance:{type:Number,required:true},
    id:{type:String,required:true},
    

},
{
    timestamps:true
})

const Users = mongoose.model("Users",userSchema)

module.exports = Users;
