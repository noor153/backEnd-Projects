const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const User = require("../db/model&schema");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "email is Already Used" });
    } else {
      const newUser = User({ name, email, password });
      await newUser.save();
      res.status(StatusCodes.OK).json({ msg: "Created Successful", newUser });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Failed", ...error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email});
    if (user) {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        const token = jwt.sign({ name: user.name }, "hhhhh");
        res.status(StatusCodes.OK).json({ msg: "Login Success", token, user });
      }
      else{
        res.status(StatusCodes.BAD_REQUEST).json({ msg: "Wrong Password" });
      }
    }
    else{
        res.status(StatusCodes.BAD_REQUEST).json({ msg: "Email Not Found" });
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Something Wrong Happened", error });
  }
};

module.exports = {
  register,
  login,
};
