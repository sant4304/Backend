const bcrypt = require("bcryptjs")
const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
const blacklistModel = require("../model/blacklist.model")
const redis = require("../config/cache")

async function registerUser(req,res){
   const {username,email,password} = req.body

   const isAlredyRegisterd = await userModel.findOne({
    $or:[{username},{email}]
   })
    
   if(isAlredyRegisterd){
    return res.status(401).json({
        message:isAlredyRegisterd.email == email ? "Email is alredy exist":"Username Is alredy exist"
    })
   }

   const hash = await bcrypt.hash(password,10)
   const user = await userModel.create(
    {
        username,
        email,
        password:hash
    }
   )

   const token = jwt.sign(
    {
        id : user._id,
        username:user.username
    },process.env.JWT_SEC,{expiresIn:"1d"}
   ) 

   res.cookie("token",token)

    res.status(201).json(
        {
            message:"User is registerd",
            user,
            token
        }
    )
}

async function loginUser(req,res){
   const {username,email,password} = req.body

   const user = await userModel.findOne(
    {
        $or:[{username},{email}]
    }
   )

   if(!user){
    return res.status(401).json(
        {
            message:"Invalid Credentials"
        }
    )
   }

   const isPasswordValid = await bcrypt.compare(password,user.password)
   if(!isPasswordValid){
    return res.status(401).json({message:"Invalid password"})
   }

   const token = jwt.sign(
    {
        id:user._id,
        username:user.username
    },process.env.JWT_SEC,{expiresIn:"1d"}
   )

   res.cookie("token",token)

res.status(201).json(
    {
        message:"User loged in",
        user,
        token
    }
)
}

async function userDetails(req,res){
   const user = await userModel.find()

   res.status(201).json(
    {
        message:"Users Details",
        user
    }
   )
}

async function getMe(req,res){

//   const token = req.cookies.token
//   const decoded = jwt.decode(token)
//  const decoded = jwt.verify(token,process.env.JWT_SEC)

  userId = req.user.id
  username = req.user.username

  console.log(userId,username)

 const user = await userModel.findById(userId)

  

   res.status(201).json(
    {
        message:"User detils",
        user
    }
   )
}

async function logOut(req,res){
    const token = req.cookies.token
    
    // const user = await blacklistModel.create(
    //     {
    //         token
    //     }
    // )

    const user = await redis.set(token,Date.now().toString(),"Ex",60)

      res.clearCookie("token");
    
      res.status(201).json(
        {
            message:"Logout",
            user
        }
      )
}

module.exports = {registerUser , loginUser , userDetails , getMe ,logOut}