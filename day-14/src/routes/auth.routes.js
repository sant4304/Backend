const express = require("express")
const userModel = require("../models/user.model")
const authRouter = express.Router()
const crypto = require("crypto")
const jwt = require("jsonwebtoken")



authRouter.post("/register",async(req,res)=>{
    const {name ,email,password} =req.body
    const userAlredyExist = await userModel.findOne({email})
    if(userAlredyExist){
       return   res.status(409).json({
            message:"User is alredy exist"
        })
    }
    const hash = crypto.createHash("sha256").update(password).digest("hex")
    const user = await userModel.create({
        name,
        password:hash,
        email,
    })
    const token = jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRATE,{expiresIn:"1h"}
    )

    res.cookie("token",token)
    res.status(200).json(
        {
            message:"User Registerd Successfully",
            user:{
                name:user.name,
                email:user.email
            },
            token
        }
    )
})

authRouter.get("/get-me",async(req,res)=>{
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

authRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    const user  = await userModel.findOne({email})
    if(!user){
        return res.status(409).json({
            message:"User is not exist"
        })
    }
   
    const userPassword = user.password=== crypto.createHash("sha256").update(password).digest("hex")
    if(!userPassword){
        return res.status(409).json({
            message:"Invalid password"
        })
    }

    const token = jwt.sign(
        {
            id:user._id,
            email:user.email
        },
        process.env.JWT_SECRATE
    )

    res.cookie("token",token)
    res.status(200).json({
        message:"User Login",
        user,
        token
    })
})


module.exports =authRouter

// authRouter.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find user
//         const user = await userModel.findOne({ email });

//         if (!user) {
//             return res.status(401).json({
//                 message: "User Not Exist"
//             });
//         }

//         // Hash entered password
//         const hashedPassword = crypto
//             .createHash("sha256")
//             .update(password)
//             .digest("hex");

//         // Check password
//         const isPassword = user.password === hashedPassword;

//         if (!isPassword) {
//             return res.status(401).json({
//                 message: "Invalid Credentials"
//             });
//         }

//         // Create token
//         const token = jwt.sign(
//             {
//                 id: user._id
//             },
//             process.env.JWT_SECRATE,
//             {
//                 expiresIn: "2h"
//             }
//         );

//         // Store token in cookie
//         res.cookie("jwt_token", token, {
//             httpOnly: true
//         });

//         // Login successful
//         return res.status(200).json({
//             message: "User Login Successfully",
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email
//             }
//         });

//     } catch (error) {
//         console.log(error);

//         return res.status(500).json({
//             message: "Internal Server Error"
//         });
//     }
// });