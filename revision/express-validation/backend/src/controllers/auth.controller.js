import bcrypt from "bcryptjs";
import userModel from "../model/user.model.js";

import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

export async function register(req, res) {
  const { username, email, password } = req.body;
  const isAlredyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isAlredyExist) {
    return res.status(401).json({
      message:
        isAlredyExist.email === email
          ? "email alredy exist"
          : "username is alredy exist",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({ username, email, password: hash });

  const emailVerification = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRATRE,
    { expiresIn: "1d" },
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
    message: "Registerd successfully",
    user,
    emailVerification,
  });
}

export async function login(req, res) {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({ $or: [{ email }, { username }] });
  if (!user) {
    return res.status(400).json({
      message: "Inavild email and password",
      success: false,
      err: "User not found",
    });
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched)
    return res.status(400).json({
      message: "Inavild email and password",
      success: false,
      err: "User not found",
    });
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRATRE,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User login",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  });
}



export async function verifyEmail(req, res) {
  // const token = req.cookies.token
  // const decoded = jwt.verify(token,process.env.JWT_SECRATRE)
  // // const decoded = jwt.decode(token)
  // console.log(decoded)
  // console.log(decoded.id)
  // console.log(token)

  const { token } = req.query;
  const decoded = jwt.decode(token);

  const user = await userModel.findOne({ email: decoded.email });

  if (!user) {
    return res.status(401).json({
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

export async function getMe(req,res){
    const userId = req.user.id
    const user = await userModel.findById(userId).select("-password")

    res.status(201).json(
        {
            message:"Your Details",
            user
        }
    )
}

export async function getDetails(req,res){
    const user = await userModel.find().select("-password")
    res.status(201).json(
        {
            message:"Users Details",
            user
        }
    )
}