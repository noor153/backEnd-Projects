const { Posts, User } = require("../../models/dbModels")
const {StatusCodes} = require("http-status-codes")

const getAllPosts = async (req,res)=> {
    try {
        const post = await Posts.find({}).where("blocked").equals(false)
        const  posts = []
        for(i=0;i<post.length;i++){
            const id = post[i].createdBy
            const user = await User.findOne({_id:id})
            if(user){
                try {
                    if(user.Activated){
                        posts.push(post[i])
                    }
                    
                } catch (error) {
       
                }
            }

        }
        
        res.status(StatusCodes.OK).json({message:"success",posts})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"failed",error})
    }    
}

const viewPosts = async (req,res)=> {
    try {
        let {pages,size} = req.query
        if(!pages){
            pages=1
        }
        if(!size){
            size=5
        }
        const limit = parseInt(size)
        const skip = (pages - 1)*size
        const all = await Posts.count()
        const totalPages = Math.ceil(all/limit)
        const posts = await Posts.find({}).limit(limit).skip(skip).populate("createdBy","name")
        res.status(StatusCodes.OK).json({message:"sucess",pages,size,totalPages,posts})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"failed",error})
    }    
}

const addPost = async (req,res)=>{

    const {title,description} = req.body
    const createdBy = req.user.id
        try {
            const newPost = new Posts({title,description,createdBy})
            const post = await newPost.save();
            res.status(StatusCodes.CREATED).json({message:"success",post})
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({message:"failed",error})
        }
}

const editPost = async (req,res)=>{

        const {id}= req.user
        const {postId,title,description} = req.body
        const post = await Posts.find({_id:postId})

        try {
            if (post[0].createdBy==id) {
                try {
                    const update = await Posts.updateOne({title,description})
                    res.status(StatusCodes.CREATED).json({message:"success",update})
                } catch (error) {
                    res.status(StatusCodes.BAD_REQUEST).json({message:"update Failed",error})
                }
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({message:"You Can't Edit This Post it isn't Yours"})

            }
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({message:"failed",error})

        }
  
       

}

const getMyPosts =async (req,res)=>{

    const {id}= req.user
    try {
        let {pages,size} = req.query
        if(!pages){
            pages=1
        }
        if(!size){
            size=10
        }
        const limit = parseInt(size)
        const skip = (pages - 1)*size
        const all = await Posts.count()
        const totalPages = Math.ceil(all/limit)
        const post = await Posts.find({createdBy:id,blocked:false}).limit(limit).skip(skip).populate("createdBy","name")

        res.status(StatusCodes.OK).json({message:"sucess",pages,size,totalPages,post})

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"failed",error})
    }
}

const deletePost =async (req,res)=>{
    const {id}= req.user
    const PostId=req.params.id
    try {
        const post = await Posts.deleteOne({}).where("_id").equals(PostId).where("createdby").equals(id)
        if(!post.deletedCount){
            res.status(StatusCodes.BAD_REQUEST).json({message:"No Such Post"})
        }else{
        res.status(StatusCodes.OK).json({message:"deleted Successfully",post})
    }} catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message:"Deletion Failed",error})

    }


}

const block = async (req, res) => {
    const { id } = req.params;
    const postCheck = await Posts.findOne({ _id: id });
      if (!postCheck.blocked) {
      try {
        try {
          const post = await Posts.updateOne({ blocked: true })
            .where("_id")
            .equals(id);
        } catch (error) {
          res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Post Doesn't Exist" });
        }
        res.status(StatusCodes.OK).json({ message: "Post Blocked" });
      } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Failed", error });
      }
    } else {
      res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Post is Already blocked" });
    }
};

module.exports = {
    getAllPosts,
    addPost,
    viewPosts,
    editPost,
    getMyPosts,
    deletePost,
    block
}