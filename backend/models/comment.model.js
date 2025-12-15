import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId , 
        ref:"User",
        required:true,
    } ,
    post:{
        type: mongoose.Schema.Types.ObjectId , 
        ref:"Post",
        required:true,
    } ,
    desc : {
        type: String,
        required:true,
    } ,
    email : {   
        type: String,
        required:true,
        unique:true,
    } ,
    img : {
        type: String,
        unique:true,
    } ,
    savedPost:{
        type:[String],
        default:[],
    }
    
},{timestamps:true})


export default mongoose.model("Comment" , commentSchema)