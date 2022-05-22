const { json } = ("express")
const Users = require("../schema/userSchema")

const getAllUsers =async (req,res)=>{
    let allusers = await Users.find()
    res.json({allusers})
}


module.exports = {
    getAllUsers
}