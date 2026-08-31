const express = require("express")
const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const authRouter = express.Router()

authRouter.post("/register",async(req,res)=>{
    const {name,email,password} =req.body
    const userAlredyExist = await userModel.findOne({email})
    
     if(userAlredyExist){
        return res.status(409).json(
            {
                message:"User alredy exist"
            }
        )
    }

    const hash =crypto.createHash("md5").update(password).digest("hex")
    const user = await userModel.create({
        name,
        email,
        password:hash
    })

    
   const token = jwt.sign(
    {
        id:user._id
    },
    process.env.JWT_SECRATE
   )

   res.cookie("jwt_token",token)

    res.status(200).json(
        {
            message:"User Registerd",
            user,
            token
        }
    )
})

authRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).json(
            {
                message:"User is not exist"
            }
        )
    }
    
    const UserPassword = user.password ===crypto.createHash("md5").update(password).digest("hex")
    if(!UserPassword){
        res.status(200).json(
            {
                message:"Inavalid Crdetials"
            }
        )
    }

    const token = jwt.sign(
        {
            id:user._id,
            email:user.email
        },
        process.env.JWT_SECRATE
    )
   res.cookie("jwt_token",token)
    res.status(401).json(
        {
            message:"Login Successfully",
            user,
            token
        }
    )

})

authRouter.post("/protected",(req,res)=>{
    console.log(req.cookies)
    res.status(200).json({
        message:"User Data"
    })
})

authRouter.get("/users",async(req,res)=>{
    const users = await userModel.find()

    res.status(200).json(
        {
            message:"User Data",
            users
        }
    )
})

module.exports= authRouter