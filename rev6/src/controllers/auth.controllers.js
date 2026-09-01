const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

async function registerController(req,res){
    const {username,email,password,bio,profileImage} = req.body

    if(!username || !email || !password){
        return res.status(409).json(
            {
                message:"username,email,password"
            }
        )
    }

    const isAlredyExist = await userModel.findOne(
        {
            $or:[{username},{email}]
        }
    )

    if(isAlredyExist){
        return res.status(409).json(
            {
                message:isAlredyExist.email==email ? "email is alredy exist":"username is alredy exist"            }
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
            id:user._id,
            username:user.username
        },process.env.JWT_SECRATE,{expiresIn:"1d"}
    )
  
    res.cookie("token",token)
   res.status(201).json(
    {
        message:"User is created",
        user:{
            username:user.username,
            email:user.email,
            id:user._id
        },
        token
    }
   )
}

async function loginController(req,res){
    const {email,password,username} = req.body
    const user = await userModel.findOne({
        $or:[
           {username:username},
           {email:email}
        ]
    })

    if(!user){
        return res.status(404).json({
            message:"User Not Found"
        })
    }

    const isValidPassword = await bcrypt.compare(password,user.password)

    if(!isValidPassword){
        return res.status(401).json({message:"Invalid credentials"})
    }

   const token = jwt.sign(
    {
        id:user._id,
        username:user.username,
        email:user.email
    },process.env.JWT_SECRATE,{expiresIn:"1d"}
   )

   res.cookie("token",token)

    res.status(201).json(
        {
            message:"user login",
            user,
            token
        }
    )
}

async function getController(req,res){
    const user = await userModel.find()

    res.status(201).json(
        {
            message:"All user s1234",
            user
        }
    )
}

module.exports= {registerController,loginController,getController}