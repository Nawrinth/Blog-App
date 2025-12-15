import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId , 
        ref:"User",
        required:true,
    } ,
    img : {
        type: String,
    } ,
    title : {
        type: String,
        required:true,
    } ,
    category:{
        type:String,
        default:"General",
    },
    slug : {
        type: String,
        required:true,
        unique:true,
    } ,
    desc : {
        type: String,
        required:true,
    } ,
    content : {
        type: String,
        required:true,
    } ,
    isFeatured:{
        type: Boolean,
        default:false,
    } ,
    visit:{
        type: Number,
        default:0,
    }
    
},{timestamps:true})


export default mongoose.model("Post" , postSchema)