const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},


},
{
    timestamps:true
})

userSchema.pre("save",async function(next){

    this.password = await bcrypt.hash(this.password,7)
    next();
}) 

const User = mongoose.model("Users",userSchema)

module.exports = User
