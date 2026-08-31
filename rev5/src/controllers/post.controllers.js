const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  privateKey: "private_ST8Bx5WA/sGNRbrUozwEljeu54E=",
});

async function createPostController(req, res) {
  console.log(req.body, req.file);
   
  const token = req.cookies.token

  if(!token){
    return res.statuse(401).json(
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
    return res.status(401).json(
        {
            message:"Auauthoeized access"
        }
    )
  }
   const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "files"),
    fileName: "Test",
    folder:"m"
  });

  const userID = decoded.id
   const post = await postModel.create(
    {
        caption:req.body.caption,
        imgURL:file.url,
        user:userID
    }
   )

   res.status(201).json(
    {
        message:"Post Created",
        post
    }
   )
}

module.exports = { createPostController };

// private_ST8Bx5WA/sGNRbrUozwEljeu54E=
