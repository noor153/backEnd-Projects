const express = require('express')
const { updateJob, deleteJob, getSingleJob, getAllJobs, addJob } = require('../controller/jobController')
const jobServer = express.Router()

jobServer.route('/:id').patch(updateJob).delete(deleteJob).get(getSingleJob)
jobServer.route('/').get(getAllJobs).post(addJob)

module.exports = jobServer