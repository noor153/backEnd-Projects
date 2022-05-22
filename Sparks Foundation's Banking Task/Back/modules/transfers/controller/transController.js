const Users = require("../../users/schema/userSchema")
const Transaction = require("../schema/transSchema")
const { json } = ("express")

const getAllTransfers = async(req,res)=>{
    let allTrans=await Transaction.find()
    res.json({allTrans})
}


const AddTrans =async (req,res)=>{



    try {
        let {Amount,reciver ,Sender} = req.body
        let senderUser =await Users.findOne({}).where('id').equals(Sender)
        let reciverUser =await Users.findOne({}).where('id').equals(reciver)

        senderUser.currentBalance =  ((senderUser.currentBalance) - (Amount))
        reciverUser.currentBalance = parseFloat(reciverUser.currentBalance) + parseFloat(Amount) 
        reciverUser.save()
        senderUser.save()

        const newUser =  new Transaction({Sender_Name:senderUser.name,Reciver_Name:reciverUser.name,TransferedBalance:Amount})
        const user = await newUser.save();
        res.status(201).redirect('/viewCustomers.html')



    } catch (error) {
        res.status(400).json({message:"failed",error})

    }

}

module.exports = {
    getAllTransfers,
    AddTrans
}