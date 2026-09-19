const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const userModel = require("../model/user.model")

async function registerController(req,res){
    
    const {username,email,password,bio,profileImage} = req.body 

    const isUserAlredyExist = await userModel.findOne(
        {
            $or:[{username},{email}]
        }
    )

    if(isUserAlredyExist){
        return res.status(401).json({
            message:isUserAlredyExist.email === email ? "email is alredy exist":"username is alredy exist"
        })
    }
    
    const hash = await bcrypt.hash(password,10)
    const user = await userModel.create({
        username,
        email,
        password:hash,
        bio
    })

    const token = jwt.sign(
        {
            id:user._id,
            username:user.username
        },process.env.JWT_SEC,{expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(201).json(
        {
            message:"User Is Registerd",
            user,
            token
        }
    )
}

async function loginController(req,res){
 const {username,email,password} = req.body
 
 const user = await userModel.findOne({
    $or:[{username},{email}]
 }).select("+password")

 if(!user){
    return res.status(401).json({message:"User Not Found"})
 }

 const isPasswordValid =await bcrypt.compare(password,user.password)
 if(!isPasswordValid){
    return res.status(401).json({message:"Password is not valid"})
 }
 
 const token = jwt.sign({
    id:user._id,
    username:user.username
 },process.env.JWT_SEC,{expiresIn:"1d"})

 res.cookie("token",token)

 res.status(201).json(
    {
        message:"User is loged in",
        user,
        token
    }
 )
}

async function getmeController(req,res){
  const id = req.user.id
  const username = req.user.username
  console.log(id,username)
  const user = await userModel.findById(id)
  res.status(201).json(
    {
        message:"User found",
        user
    }
  )
}

async function userController(req,res){
 const user = await userModel.find()
 res.status(201).json(
    {
        message:"Users found",
        user
    }
 )
}
module.exports ={registerController,loginController,getmeController,userController}