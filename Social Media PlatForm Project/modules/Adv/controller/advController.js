const { Adv } = require("../../models/dbModels")
const {StatusCodes} = require("http-status-codes")

const getAllAdv = async (req,res)=>{

    try {
        const adv = await Adv.find({})
        if(adv==""){
            res.status(StatusCodes.OK).json({message:"No Any advertisement at This Moment"})
        }
        else{
            res.status(StatusCodes.OK).json({message:"success",adv})
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"failed",error})
    }   

}

const addAdv = async (req,res)=>{
    const {title,description} = req.body
        try {
            const newPost = new Adv({title,description})
            const post = await newPost.save();
            res.status(StatusCodes.CREATED).json({message:"success",post})
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({message:"failed",error})
        }
}

const deleteAdv = async (req,res)=>{
    const advId=req.params.id
    try {
        const adv = await Adv.deleteOne({_id:advId})
        if(!adv.deletedCount){
            res.status(StatusCodes.BAD_REQUEST).json({message:"No Such Post"})
        }
        else{
        res.status(StatusCodes.OK).json({message:"deleted Successfully",adv})
    }} catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"Deletion Failed",error})

    }
}

const updateAdv = async (req,res)=>{

        const {title,description} = req.body
        const advId = req.params.id
        const AD = await Adv.find({_id:advId})
        if(AD){
            try {
                try {
                    const update = await Adv.updateOne({title,description}).where("_id").equals(advId)
                    res.status(StatusCodes.CREATED).json({message:"success",update})
                } catch (error) {
                    res.status(StatusCodes.BAD_REQUEST).json({message:"update Failed",error})
                }
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({message:"failed",error})

        }
        }
        else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"No Any Ads With this Id",error})

        }
}


module.exports = {
    getAllAdv,
    addAdv,
    deleteAdv,
    updateAdv 
}