const express = require("express")
const userModel = require("../models/notes.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const authRouters = express.Router()

authRouters.post("/register",async(req,res)=>{
    const {username,email,password} = req.body
    const userExist = await userModel.findOne({email})
    if(userExist){
        return res.status(201).json(
            {
                message:" Alredy Exist"
            }
        )
    }
     const hash = crypto.createHash("md5").update(password).digest("hex")
    const user = await userModel.create({
        username,
        email,
        password:hash
    })
    
    const token = jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRATE,{expiresIn:"1d"}
    )
 
    res.cookie("token",token)
    
    res.status(201).json(
        {
            message:"User is registerd",
            user:{
                username:user.username,
                email:user.email
            },
            token
        }
    )

})


authRouters.get("/get-me",async(req,res)=>{
    const token = req.cookies.token
    const decoded = jwt.verify(token,process.env.JWT_SECRATE)
    console.log(decoded)
    const user = await userModel.findById(decoded.id)

    res.status(201).json(
        {
            message:"User Token",
            user:{
                name:user.name,
                email:user.email
            },
            token
        }
    )
   
})


authRouters.post("/login",async(req,res)=>{
    const {email,password} = req.body
    const user =await userModel.findOne({email})
    if(!user){
        return res.status(401).json({
            message:"This email is not exist"
        })
    }
    const hash = crypto.createHash("md5").update(password).digest("hex")
    const userpassword = user.password ==hash
    if(!userpassword){
        return res.status(401).json(
            {
                message:"Invalid Credentials"
            }
        )
    }

    const token = jwt.sign(
        {
            id:user._id
        },process.env.JWT_SECRATE,{expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(409).json(
        {
            message:"Login Successfully",
            user,
            token
        }
    )
})

module.exports = authRouters