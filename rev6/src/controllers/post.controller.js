const postModel = require("../model/post.model")
const ImageKit = require("@imagekit/nodejs/index.js");
const { toFile } = require("@imagekit/nodejs/index.js");
const jwt = require("jsonwebtoken")
// const likeModel = require("../model/like.model")

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req,res){
    // console.log(req.body,req.file)
    
    console.log(req.user)

    const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "cohort-2-insta-clone-posts",
  });

  
  const post = await postModel.create(
    {
        caption:req.body.caption,
        imgURL:file.url,
        user:req.user.id
    }
  )
    res.status(201).json(
        {
            message:"Post Created",
            post
        }
    )
}

async function getPostController(req,res){
    const userId = req.user.id
    const posts = await postModel.find(
        {
            user:userId
        }
    )
    res.status(201).json(
        {
            message:"User post",
            posts
        }
    )
}

async function getPostDetails(req,res){
  const userId = req.user.id
  const id = req.params.id
  console.log(userId,id)

  const post = await postModel.findById(id)

  const isValidUser = post.user.toString() == userId
  if(!isValidUser) return res.status(400).json({message:"Invalid User"})
  res.status(201).json(
    {
        message:"Post found",
        post
    }
  )
}



module.exports = {createPostController,getPostController,getPostDetails}