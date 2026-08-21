const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRouter =express.Router()


/*
* here we can authRouter by app.use("api/auth",authROuter)
* it look like api/auth/register   it is kind of preffix(api/auth) or this preffix is changabl
*/ 
authRouter.post("/register",async(req,res)=>{

    const {name,email,password} = req.body
    const userAlreadyExist = await userModel.findOne({email})
 
    if(userAlreadyExist){
        return res.status(400).json({
            message:"User alredy exist"
        })
    }

    const user = await userModel.create({
        name,
        email,
        password
    })
      
    const token = jwt.sign(
        {
            id:user._id,
            email:user.email,
         

        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_tokken",token)
    res.status(201).json({
        message:"User is Register",
        user,
        token
    })
})

authRouter.get("/users",async(req,res)=>{
    const reg = await userModel.find()
    
    res.status(200).json({
        message:"User data",
        note :reg
    })
})
module.exports=authRouter

