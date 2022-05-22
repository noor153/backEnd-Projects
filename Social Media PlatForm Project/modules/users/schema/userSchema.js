const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { x } = require('joi')

const userSchema = new mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:String,required:true},
    location:{type:String},
    role:{type:String,default:"user"},
    verified:{type:Boolean,default:false},
    isDeleted:{type:Boolean,default:false},
    Activated:{type:Boolean,default:true},
    blocked:{type:Boolean,default:false}

},
{
    timestamps:true
})

userSchema.pre("save",async function(next){

    this.password = await bcrypt.hash(this.password,7)
    this.phone = jwt.sign({phone:this.phone},"shhhhh")

    next();
}) 


module.exports = userSchema;
