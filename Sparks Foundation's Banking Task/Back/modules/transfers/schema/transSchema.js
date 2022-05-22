const mongoose = require('mongoose')
const transSchema = new mongoose.Schema({

    Sender_Name:{type:String,required:true},
    Reciver_Name:{type:String,required:true},
    TransferedBalance:{type:String,required:true}

},
{
    timestamps:true
})

const Transaction = mongoose.model("Transaction",transSchema)

module.exports = Transaction;
