import commentModel from "../models/comment.model.js"

export const getPostComments = async (req , res)=>{
    const comments = await commentModel.find({post:req.params.postId}).populate("user" , "username img").sort({createdAt:-1});

    res.json(comments)
}
export const addComment = (req , res)=>{

}
export const deleteComment = (req , res)=>{

}