const { User } = require("../../models/dbModels")
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAllUsers = async (req,res)=>{
    
    const users = await User.find({})
    res.json({message:"success",users})
    
}

const signUp = async (req,res)=>{
    const {name,email,password,cPassword,phone,location}=req.body
    try {

        try {
                const check = await User.findOne({email})
                if(check){
                    res.status(StatusCodes.BAD_REQUEST).json({message:"Email is Already Used"})
                }
                else{
                const newUser =  new User({name,email,password,phone,location})
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

       const {email,password} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            res.status(StatusCodes.BAD_REQUEST).json({message:"Email Isn't Available"})
        }
        if(user.blocked){
            res.status(StatusCodes.BAD_REQUEST).json({message:"This Account Is Blocked By Admins"})
        }
        else{

            const match = bcrypt.compare(user.password,password)
            if(match){
                //ERR In Update
                if(!user.Activated){
                    const id = user._id
                    await User.updateMany({Activated:true}).where("_id").equals(id)
                }
                const token = jwt.sign({id:user._id,role:user.role,email:user.email},"shhhhh")
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
                    message:"PassWord Is InCorrect"
                })
            }
        }

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message:"Failed To SignIn",
            error
        })
    }

}

const getAdmins = async (req,res)=>{
    try {
        const admin = await User.find({}).where("role").equals("admin")
        res.status(StatusCodes.OK).json({message:"Success",admin})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"failed",error})
    }

}

const addAdmin = async (req, res) => {
    const { name, email,cPassword, password, phone, location } = req.body;
    const role = "admin";
    try {
      const check = await User.findOne({ email });
      if (check) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Email is Already Used" });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          phone,
          location,
          role,
        });
        const user = await newUser.save();
        res.status(StatusCodes.CREATED).json({ message: "success", user });
      }
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "failed", error });
    }
};
  
  const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    const adminCheck = await User.findOne({ id }).where("role").equals("admin");
  
    if (adminCheck) {
      try {
        const admin = await User.deleteOne({ id });
        res
          .status(StatusCodes.CREATED)
          .json({ message: "Deleted successfully", admin });
      } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "failed", error });
      }
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User isn't an Admin or Doesn't Exist", error });
    }
};
  
  const deActivate = async (req, res) => {
    const  id  = req.params.id;
    const userCheck = await User.findOne({ _id: id });
    if (userCheck.Activated) {
      try {
        try {
          const user = await User.updateOne({ Activated: false })
            .where("_id")
            .equals(id);
        } catch (error) {
          res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "User Doesn't Exist" });
        }
        res.status(StatusCodes.OK).json({ message: "Account deActivated" });
      } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Failed", error });
      }
    } else {
      res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Account is Already deActivated" });
    }
};
  
  const block = async (req, res) => {
    const { id } = req.params;
    const userCheck = await User.find({ _id: id });
  
    if (!userCheck.blocked) {
      try {
        try {
          const user = await User.updateOne({ blocked: true })
            .where("_id")
            .equals(id);
        } catch (error) {
          res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "User Doesn't Exist" });
        }
        res.status(StatusCodes.OK).json({ message: "Account deActivated" });
      } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Failed", error });
      }
    } else {
      res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Account is Already blocked" });
    }
};
  
  const updatePassWord = async (req, res) => {
    const { oldPassword, newPassword, cnewPassword } = req.body;
    const id = req.user.id;
    try {
      if (newPassword == cnewPassword) {
        const user = await User.find({ _id: id });
        const oldCheck = await bcrypt.compare(oldPassword, user[0].password)
        if(oldCheck){

               const password = await bcrypt.hash(newPassword,7)

                const Updated =  await User.updateMany({password:password}).where("_id").equals(id)
              res
                .status(StatusCodes.OK)
                .json({ message: "Updated Successfully", Updated });
        }
        else{
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Password Don't Match With The Old One" });
        }
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "PassWord & confirm PassWord Doesn't Match" });
      }
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Failed", error });
    }
};
  
  const updateUser = async (req, res) => {
  
      const {name}=req.body
      const id = req.user.id
      try {
  
          const Updated =  await User.updateMany({name:name}).where("_id").equals(id)

          res
          .status(StatusCodes.OK)
          .json({ message: "Updated Successfully", Updated });
  
          
      } catch (error) {
              res.status(StatusCodes.BAD_REQUEST).json({ message: "Failed", error });
  
      }
};
  

module.exports = {

    getAllUsers,
    signUp,
    signIn,
    getAdmins,
    addAdmin,
    deleteAdmin,
    deActivate,
    block,
    updatePassWord,
    updateUser
   
}