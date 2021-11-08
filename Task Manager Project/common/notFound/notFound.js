const {StatusCodes}= require('http-status-codes')
const notFound = (req,res)=>{
    res.status(StatusCodes.NOT_FOUND).json({message:"Route Doesn't Exist (PAGE NOT FOUND)"})
}
module.exports = notFound