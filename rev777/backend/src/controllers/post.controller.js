const ImageKit = require("@imagekit/nodejs/index.js");
const { toFile } = require("@imagekit/nodejs/index.js");
const postModel = require("../model/post.model");
const likeModel = require("../model/like.model");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req,res){
    console.log(req.body,req.file)
    
    const id = req.user.id
    const username = req.user.username
 
   
    const file = await imagekit.files.upload(
        {
            file:await toFile(Buffer.from(req.file.buffer),"file"),
            fileName:"Test",
            folder:"Rev"
        }
    )
    console.log(id , username)
    
    console.log(req.body.caption)
 
   const post = await postModel.create(
    {
        caption:req.body.caption,
        imgURL:file.url,
        user:req.user.id
    }
   )

    res.status(201).json(
        {
            message:"Post",
            post
        }
    )


}

async function getPostController(req,res){
 const userId = req.user.id
 console.log(userId)
 const posts = await postModel.find({user:userId}).populate("user")
 res.status(201).json(
    {
        message:"User Post",
        posts
    }
 )
}

async function getPostDetails(req,res){

    const id = req.user.id
    const postId = req.params.postId
    console.log(id)
    console.log(postId)
    const post = await postModel.findById(postId)

    const isValidUser = post.user.toString() == id

    if(!isValidUser){
        return res.status(404).json(
            {
                message:"User Not Found"
            }
        )
    }
    res.status(201).json(
        {
            message:"Post found",
            post
        }
    )
}

async function  likePostController(req,res){
    const username = req.user.username
    const postId = req.params.postId
    
    const post = await postModel.findById(postId)

    const like = await likeModel.create({
        post:postId,
        user:username
    })
    res.status(201).json(
        {
            message:"You like the post",
            like
        }
    )
}

async function getFeedController(req,res){
    const  posts = await postModel.find().populate("user")

    res.status(201).json({
        message:"Post Founds",
        posts
    })
}
module.exports = {createPostController,getPostController,getPostDetails,likePostController,getFeedController}