const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username ,email,password required",
    });
  }

  const isAlredyExist = await userModel.findOne({$or:[{username},{email}]});
  if(isAlredyExist){
    return res.status(409).json(
        {
            message:isAlredyExist.email == email?"user is alredy exist":"username is alredy exist"
        }
    )
  }

  const hash = await bcrypt.hash(password,10)

  const user = await userModel.create(
    {
        username,
        email,
        password:hash,
        bio,
        profileImage
    }
  )

  const token = jwt.sign(
    {
        id:user._id
    },process.env.JWT_SECRATE,{expiresIn:"1d"}
  )

  res.cookie("token",token)
   
    res.status(201).json(
        {
            message:"User is registerd",
            user,
            token
        },
        
    )

}


async function loginController(req,res){
    const {username,email,password} = req.body

    const user = await userModel.findOne({$or:[{username},{email}]})
    if(!user){
        return res.status(404).json(
            {
                message:"User is not found"
            }
        )
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(401).json(
            {
                message:"Inavlid password"
            }
        )
    }

    const token = jwt.sign(
        {
            id:user._id
        },process.env.JWT_SECRATE,{expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(201).json(
        {
            message:"Login Successfully",
            user,
            token
        }
    )
}

async function userController(req,res){
    const user = await userModel.find()

    res.status(201).json(
        {
            message:"user details",
            user
        }
    )
}
module.exports = {
    registerController,loginController,userController
}