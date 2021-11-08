const Task = require("../schema/taskSchema");
const { StatusCodes } = require("http-status-codes");
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(StatusCodes.OK).json({ tasks });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Failed" });
  }
};

const addTask = async (req, res) => {
  const { name } = req.body;

  try {
    const newTask = Task({ name });
    const task = await newTask.save();
    res.status(StatusCodes.CREATED).json({ task });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Failed" });
  }
};

const editTask = async (req, res) => {
  const { id:taskID } = req.params;
  const { name, completed } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskID },
      { name, completed },
      { new: true, runValidators: true }
    );
    if (!task) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `there is no task with this id ${taskID}` });
    }
    res.status(StatusCodes.OK).json({ data: task });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Failed" });
  }
};

const deleteTask = async (req, res) => {
  const { id :taskID} = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `there is no task with this id ${taskID}` });
    }
    res.status(StatusCodes.OK).json({ message: "Deleted Sucessfully" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Failed" });
  }
};

const getSingleTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ _id: id });
    if (!task) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `there is no task with this id ${id}` });
    }
    res.status(StatusCodes.OK).json({task });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Failed" });
  }
};

module.exports = {
  getAllTasks,
  addTask,
  editTask,
  getSingleTask,
  deleteTask,
};
