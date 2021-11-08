const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: [true,"Enter Task Name"] },
    completed: { type: Boolean,default:false},
  },
  {
    timestamps: true,
  }
);
const Task = mongoose.model("tasks",taskSchema)
module.exports=Task