const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const blacklistModel = require("../models/blacklist.model")
async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const isAlreadyRegisterd = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isAlreadyRegisterd) {
    return res.status(400).json({
      message:
        isAlreadyRegisterd.email == email
          ? "Email is alredy registerd"
          : "username is already registerd",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JwT_SEC,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registerd successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
    },
    token,
  });
}

async function loginUser(req, res) {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ email }, { username }],
  }).select("+password")

  if (!user) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JwT_SEC,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Login",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
    },
    token,
  });
}

async function getMe(req, res) {
  const userId = req.user.id;
  const username = req.user.username;

  console.log(userId, username);
  const user = await userModel.findById(userId).select("-password")
  res.status(201).json({
    message: "User found",
    user
  });
}

async function logoutUser(req,res){
//  const id = req.user.id
//  const username = req.user.username
//  console.log(id,req.user.username)

 const token = req.cookies.token

//  const decoded = jwt.decode(token)
//  const decoded = jwt.verify(token,process.env.JwT_SEC)
//  console.log(decoded)
//  const id = decoded.id
//  const username = decoded.username

 const black = await blacklistModel.create(
    {
        token:token
    }
 )

     res.clearCookie("token");


//  res.clearCookie("token")

 res.status(201).json(
    {
        message:"Logout Successfully",
        black
    }
 )
}
module.exports = { registerUser, loginUser ,getMe,logoutUser};
