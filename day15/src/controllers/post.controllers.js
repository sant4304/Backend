const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  console.log(req.body, req.file);

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token is not provided ,Unauthorized access",
    });
  }
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRATE);
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized access",
    });
  }
  console.log(decoded);

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "cohort-2-insta-clone-posts",
  });
  // res.send(file)

  const post = await postModel.create({
    caption: req.body.caption,
    imgURL: file.url,
    user: decoded.id,
  });

  res.status(201).json({
    message: "Post Is created Successfully",
    post,
  });
}

async function getPostController(req, res) {

  const token = req.cookies.token;
  if(!token){
        return res.status(401).json(
            {
                message:"Token is not found"
            }
        )
      }

  let decoded //here we intialize decoded here it block level scoper variable 
  
  try{
    decoded = jwt.verify(token,process.env.JWT_SECRATE)
  }catch(err){
    return res.status(401).json(
        {
            message:"Invalid Token"
        }
    )
  }

  console.log(decoded)
  const userId = decoded.id


  const posts = await postModel.find({
    user:userId
  })

  res.status(201).json(
    {
        message:"User Found",
        posts
    }
  )

//   const user = await userModel.find()

   


}

async function getPostDetails(req,res) {
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
        decoded =jwt.verify(token,process.env.JWT_SECRATE)
      }
      catch(err){
        return res.status(409).json(
            {
                message:"Inavild Token"
            }
        )
      }



      let userId = decoded.id
      const postId =req.params.postId
    console.log(userId)
      
      const post = await postModel.findById(postId)
      if(!post){
        return res.status(404).json(
            {
                mesaage:"Post is not found"
            }
        )
      }

      const isValidUser = post.user.toString() === userId
      if(!isValidUser){
        return res.status(403).json(
            {
                message:"Forbidden Content"
            }
        )
      }

      return res.status(200).json(
        {
            message:"Post Fetched",
            post
        }
      )
    //   console.log(postId)
}
module.exports = { createPostController, getPostController ,getPostDetails };
