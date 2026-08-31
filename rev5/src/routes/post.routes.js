const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controllers")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})
const postModel = require("../models/post.model")
const jwt =  require("jsonwebtoken")



postRouter.post("/",upload.single("image"),postController.createPostController )

postRouter.get("/",async(req,res)=>{
   const token = req.cookies.token
   if(!token){
    return res.status(401).json(
        {
            message:"Token is not found"
        }
    )
   }
   let decoded 
   try{
    decoded = jwt.verify(token,process.env.JWT_SECRATE)
   }
   catch(err){
    return res.status(404).json(
        {
            message:"Anauthorized access"
        }
    )
   }

   console.log(decoded)
   const user = await postModel.find(
    {
        user:decoded.id
    }
   )

   res.status(201).json(
    {
        message:"User Found",
        user
    }
   )
})


postRouter.get("/de/:id",async(req,res)=>{
    const token = req.cookies.token
    
    const decoded = jwt.verify(token,process.env.JWT_SECRATE)
    
    const userID = decoded.id
    const id = req.params.id

    const post = await postModel.findById(id)
    
    const validUser = post.user.toString() === userID
    if(!validUser){
        return res.status(404).json(
            {
                message:"Post Not Found"
            }
        )
    }
    
    res.status(201).json(
        {
            message:"User Fetched",
            post
        }
    )

})

module.exports = postRouter