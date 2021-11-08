const Job = require("../db/model&schema")
const {StatusCodes} = require('http-status-codes')

const updateJob = async (req,res)=>{
    const {id} = req.params
    const {company,position} = req.body
    try {
        if(company && position){
            const job = await Job.findOneAndUpdate({_id:id},{company,position})
            res.status(StatusCodes.OK).json({msg:"company & position updated Successfully",job})
        }
        else if(company && !position){
            const job = await Job.findOneAndUpdate({_id:id},{company})
            res.status(StatusCodes.OK).json({msg:"company updated Successfully",job})
        }       
        else if(!company && position){
            const job = await Job.findOneAndUpdate({_id:id},{position})
            res.status(StatusCodes.OK).json({msg:"position updated Successfully",job})
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({msg:"error Happened",error})
    }
}
const deleteJob = async (req,res)=>{
    const {id} = req.params
    try {
        const job = await Job.deleteOne({_id:id})
        res.status(StatusCodes.OK).json({msg:"Job Deleted Sucessfully",job})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({msg:"error Happened",error})
    }
}
const getSingleJob  = async (req,res)=>{
    const {id} = req.params
    try {
        const job = await Job.findOne({_id:id})
        res.status(StatusCodes.OK).json({msg:"job",job})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({msg:"error Happened",error})
    }
}
const getAllJobs = async (req,res)=>{
    try {
        const jobs = await Job.find({})
        res.status(StatusCodes.OK).json({msg:"All Jobs",jobs})
        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({msg:"error Happened",error})
    }
}
const addJob = async (req,res)=>{
    const {company,position} = req.body
    try {
        const newJob = Job({company,position}) 
        await newJob.save()
        res.status(StatusCodes.OK).json({msg:"Job Added Successfully",newJob})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({msg:"Addition Failed",error})
    }
}

module.exports = {
    updateJob,
    deleteJob,
    getSingleJob,
    getAllJobs,
    addJob
}