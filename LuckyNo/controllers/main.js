const User = require("../schema/usersSchema");
const jwt = require('jsonwebtoken')
const dashboard = async (req, res) => {
  const luckyNo = Math.floor(Math.random()*100)
  res.status(200).json({ msg: `welcome ${req.user.username}` , secret:`your Lucky Number is ${luckyNo} ` });
};
const login = async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password){
      res.json({msg:"Plz Provide username & password"})
  }
  try {
      const user = await User.findOne({username})
      console.log(user);
      if(user){
        if(user.password==password){
            const token = jwt.sign({username,password},'hhhhh',{expiresIn:20})
            res.status(200).json({msg:'login done',token})
           }
      res.status(400).json({msg:'passWord Doesnt Match'})
      }
    res.status(400).json({msg:'User Not Found'})
  } catch (error) {
       res.status(401).json({msg:'failed',error})
  }
};
module.exports = { dashboard, login };