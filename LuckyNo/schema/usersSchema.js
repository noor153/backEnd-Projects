const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true}
})

const User = mongoose.model('login',usersSchema)
module.exports =User