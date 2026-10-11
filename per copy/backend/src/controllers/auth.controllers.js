import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.services.js";

/**
 * @route POST /api/auth/register
 * @desc Register  new user
 * @access Public
 * @body {username,emial,password}
 */ 


export async function register(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User with this emial or username is alredy exists",
      success: false,
      err: "User is alredyExist",
    });
  }

  const user = await userModel.create({ username, email, password });

  const emailVerification = jwt.sign(
    {
      email: user.email,
      id: user._id,
    },
    process.env.JWT_SECRATE,
  );

  console.log(
    "VERIFY URL:",
    `http://localhost:3000/api/auth/verify-email?token=${emailVerification}`,
  );
  res.cookie("token", emailVerification);

  await sendEmail({
    to: email,
    subject: "Welcome to perplexity",
    html: ` 
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerification}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Perplexity Team</p> `,
  });

  res.status(201).json({
    message: "User registerd successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    emailVerification,
  });
}


/**
 * @route POST /api/auth/login
 * @desc Login the user and return jwt tokem
 * @access Public
 * @body {emial,password}
 */ 

export async function login(req,res){
    const {email,password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"Inavild email and password",
            success:false,
            err:"User not found"
        })
    }

    const isPasswordMatch = await user.comparePassword(password)
    if(!isPasswordMatch){
         return res.status(400).json({
            message:"Inavild email and password",
            success:false,
            err:"In correct password" 
        })
    }

    if(!user.verified){
         return res.status(400).json({
            message:"please verify your email before loging",
            success:false,
            err:"Email is not verified"
        })
    }

    const token = jwt.sign(
        {
            id :user._id,
            username:user.username,
        },process.env.JWT_SECRATE,{expiresIn:"7d"}
    )

    res.cookie("token",token)

    res.status(200).json(
        {
            message:"User login",
            success:true,
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            },
            token
        }
    )
}

/**
 * @route POST /api/auth/get-me
 * @desc give current login user details
 * @access Private
 */ 

export async function getMe(req,res){
    console.log(req.user)

    const userId = req.user.id
    const user = await userModel.findById(userId).select("-password")
    if(!user){
        return res.status(404).json(
            {
                message:"User not found",
                success:false,
                err:"user not found"
            }
        )
    }

    res.status(201).json(
        {
            message:"User details fetched successfully",
            success:true,
            user
        }
    )
}


/**     
 * @route  GET /api/auth/verify-email
 * @desc verify user email addres
 * @access Public
 * @body {token}
 */ 


export async function verifyEmail(req, res) {
  const { token } = req.query;

  try{
  const decoded = jwt.verify(token, process.env.JWT_SECRATE);
  const user = await userModel.findOne({ email: decoded.email });
  if (!user) {
    return res.status(400).json({
      message: "Invalid token",
      success: false,
      err: "User not found",
    });
  }
  user.verified = true;

  await user.save();

  const html = `
        <h1>Email Verified Successfully!</h1>
        <p>Your email has been verified. You can now log in to your account.</p>
        <a href="http://localhost:3000/login">Go to Login</a>
    `;

  return res.send(html);
  }
  catch(err){
    return res.status(400).json(
        {
            message:"Invalid tokken",
            success:false,
            err:err.message
        }
    )
  }
}
