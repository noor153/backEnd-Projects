const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: [true,'please Provide password'] },
    email: {
      type: String,
      required: [true, "Please Provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ,'Please Provide email'],
      unique:true
    },
  },
  {
    timestamps: true,
  }
);
usersSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 7);
  next();
});

const User = mongoose.model("user", usersSchema);

module.exports = User;
