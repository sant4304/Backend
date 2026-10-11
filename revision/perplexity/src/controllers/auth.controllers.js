import userModel from "../model/user.model.js";
import { sendEmail } from "../services/mail.service.js";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserAlreadyExists) {
    return res.status(401).json({
      message: "User with this emial or username is alredy exists",
      success: false,
      err: "User is alredyExist",
    });
  }

  const user = await userModel.create({ username, email, password });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRATE,
  );

  res.cookie("token", token);

  await sendEmail({
    to: email,
    subject: "Welcome to perplexity",
    html: ` 
            <p>Hi ${username},</p>
            <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
            <p>Please verify your email address by clicking the link below:</p>
            <a href="http://localhost:3000/api/auth/verify-email?token=${token}">Verify Email</a>
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
    token,
  });
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Inavild email and password",
      success: false,
      err: "User not found",
    });
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return res.status(401).json({
      message: "Please enter valid password",
      success: false,
      err: "Inavlid passwoed",
    });
  }

  if (!user.verified) {
    return res.status(400).json({
      message: "please verify your email before loging",
      success: false,
      err: "Email is not verified",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRATE,
    { expiresIn: "7d" },
  );

  res.cookie("token", token);

  res.status(200).json({
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

export async function getMe(req, res) {
  const userId = req.user.id;
  console.log(userId);

  const user = await userModel.findById(userId).select("-password");

  if (!user) {
    return res.status(401).json({
      message: "User not found",
      success: false,
      err: "not found",
    });
  }

  res.status(201).json({
    message: "User details fetched successfully",
    success: true,
    user,
  });
}

export async function verifyEmail(req, res) {
  const { token } = req.query;
  console.log(token);
  const decoded = jwt.decode(token);
  console.log(decoded.email);

  const user = await userModel.findOne({ email: decoded.email });

  user.verified = true;

  await user.save();

  const html = `
        <h1>Email Verified Successfully!</h1>
        <p>Your email has been verified. You can now log in to your account.</p>
        <a href="http://localhost:3000/api/auth/login">Go to Login</a>
    `;

  res.send(html);
}
