import { messageInRaw } from "svix";
import Post from "../models/post.model.js"
import User from "../models/user.model.js"
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY
});


// Get All Posts 
export const getPosts = async (req , res) =>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const posts = await Post.find().limit(limit).skip((page - 1) * limit).populate("user","username");
    const totalPosts = await Post.countDocuments();
    const hasMore = totalPosts > page * limit;
    res.status(200).json({posts , hasMore})
}

// Get Particular Post
export const getPost = async (req , res) =>{
    const post = await Post.findOne({slug:req.params.slug}).populate("user","username img");
    res.status(200).json(post)
}

// Create a post
export const  createPost = async (req , res) =>{
    const clerkId = req.auth().userId;
    console.log(req.body )
    if (!clerkId){
        return res.status(401).json("Not Authendicated")
    }
    const user =  await User.findOne({clerkUserId:clerkId})
    if (!user){
        res.status(404).json("User not found")
    }

    let slug = req.body.title.toLowerCase()
    .trim().replace(/[^a-z0-9\s-]/g, "") .replace(/\s+/g, "-");  
    let baseSlug = slug;
    let existingPost = await Post.findOne({slug})
    let counter = 1

    while (existingPost){
        slug = `${baseSlug}-${counter}`
        counter++;
        existingPost = await Post.findOne({slug});
    }

    const newPost = new Post({user:user._id, ...req.body , slug:slug})
    console.log(newPost)
    const postSave = await newPost.save();
    res.status(200).json({message:"Post saved successfully",data : newPost})
}

// Delete a Post 

export const  deletePost = async (req , res) =>{
    const clerkId = req.auth().userId;
    if (!clerkId){
        return res.status(401).json("Not Authendicated")
    }
    const user =  await User.findOne({clerkUserId:clerkId})
    if (!user){
        res.status(404).json("User not found")
    }
    console.log(user)
    const deletedPost = await Post.findOneAndDelete({_id:req.params.id , user:user._id});
    if (!deletedPost){
        return res.status(403).json("Not Allowed to delete others post")
    }
    console.log("Deleting post with ID:", req.params.id);
    res.status(200).json("Post has been deleted"); 

};



export const uploadAuth = (req, res) => {
  const { token, expire, signature } = imagekit.getAuthenticationParameters();
  res.send({ token, expire, signature, publicKey: process.env.IK_PUBLIC_KEY });
};