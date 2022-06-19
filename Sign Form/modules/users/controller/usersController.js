const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../schema/userSchema')
const {StatusCodes} =require("http-status-codes")

const signUp = async (req,res)=>{

    const {name,email,password,cPassword}=req.body
    try {
        try {
                const check = await User.findOne({email})
                if(check){
                    res.status(StatusCodes.BAD_REQUEST).json({message:"Email is Already Used"})
                }

                else{
                const newUser =  new User({name,email,password})
                const user = await newUser.save();
                res.status(StatusCodes.CREATED).json({message:"success",user})}
            } catch (error) {
                res.status(StatusCodes.BAD_REQUEST).json({message:"failed",error})
            }

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"Failed",error})

    }
    
}

const signIn = async (req,res)=>{


    const {email,password} = req.body

    
    try{

        const user = await User.findOne({email})
        if(!user) {
            res.status(StatusCodes.NOT_FOUND).json({
                message:"Email is not Found",
            })
        }

        else{
            const match =await bcrypt.compare(password,user.password)
            console.log(match);
            if(match){
                const token = jwt.sign({id:user._id,email:user.email},"shhhhh")
                res.status(StatusCodes.OK).json({
                    token,
                    user:{
                        id:user._id,
                        name:user.name,
                        email:user.email,
                        role:user.role,
                    }
                })
            }
            else{
                res.status(StatusCodes.BAD_REQUEST).json({
                    message:" Wrong Password"
                })
            }
        }
    }
    catch{

        res.status(StatusCodes.BAD_REQUEST).json({
            message:"Failed To SignIn"
        })
    }

}

module.exports ={
    signUp,
    signIn
}