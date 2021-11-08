const { Report, Posts } = require("../../models/dbModels")
const {StatusCodes} = require('http-status-codes')


const addReport = async (req,res)=>{

    const userID = req.user.id
    const {postID,reportComment} =req.body
    const reportCheck = await Report.findOne({postID:postID,userID:userID})
    if(reportCheck){
        res.status(StatusCodes.BAD_REQUEST).json({message:"There Is A Report With This user To The Same Report Before"})
    }
    else{
        try {

            const post = await Posts.findOne({_id:postID})
            if(post){
                const newReport = new Report({userID,postID,reportComment})
                const report = await  newReport.save();
                res.status(StatusCodes.CREATED).json({message:"success",report})
            }
            else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"No Such Post"})

            }
            
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({message:"failed",error})
    
        }

    }

}

const deleteReport = async (req,res)=>{
    const reportId=req.params.id
    try {
        const report = await Report.deleteOne({_id:reportId})
        if(!report.deletedCount){
            res.status(StatusCodes.BAD_REQUEST).json({message:"No Such Report"})
        }
        else{
        res.status(StatusCodes.OK).json({message:"deleted Successfully",report})
    }} catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"Deletion Failed",error})

    }
}

const getAllReports = async (req,res)=>{

    try {
        let posts = []
        const cursor = await Posts.find({}).cursor()
        for(let doc =await cursor.next() ; doc!= null ;doc = await cursor.next()){
            const reports = await Report.find({postID:doc._id})
            const obj = {...doc._doc,reports}
            posts.push(obj)
        }
        
        res.status(StatusCodes.OK).json({message:"Post With Reports",posts})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"Failed",error})
    }
}

module.exports = {
    addReport,
    deleteReport,
    getAllReports,
}