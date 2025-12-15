import express from "express"
import  {getPosts , getPost , createPost , deletePost , uploadAuth }  from "../controllers/post.controller.js";

const route = express.Router();   

route.get("/upload-auth",uploadAuth)
route.get("/" , getPosts)
route.get("/:slug" , getPost)
route.post("/",createPost)
route.delete("/:id",deletePost)
export default route