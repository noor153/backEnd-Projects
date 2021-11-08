const { getAllTasks, addTask, getSingleTask, deleteTask, editTask } = require("../controller/taskController")

const router = require("express").Router()

router.route("/").get(getAllTasks).post(addTask)
router.route("/:id").get(getSingleTask).patch(editTask).delete(deleteTask)




module.exports=router