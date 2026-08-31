
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")



async function registerController(req,res){
  const { username, email, password, bio, profileImage } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username, email and password are required",
    });
  }

  const isUserAlredyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlredyExist) {
    return (
      res.status(409).json({
        message:
          "User alredy exist" +
          (isUserAlredyExist.email == email
            ? "Email is alredy Exist"
            : "Username alredy used"),
      })
    );
  }

  // const hash = crypto.createHash("sha256").update(password).digest("hex");
    const hash = await bcrypt.hash(password,10)
  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRATE,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Registerd Successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
    token,
  });

}

async function loginController(req, res){
  const { username, email, password } = req.body;

  
  const user = await userModel.findOne({
    $or: [
      {
        username: username,
      },
      {
        email: email,
      },
    ],
  });

  if(!user){
    return res.status(409).json({
        message:"User is not found"
    })
  }

  const isPasswordVaild = await bcrypt.compare(password,user.password)

  if(!isPasswordVaild){
    return res.status(401).json(
        {
            message:"Inavalid password"
        }
    )
  }

  const token = jwt.sign(
    {
        id:user._id
    },process.env.JWT_SECRATE,{expiresIn:"1d"}
  )

  res.cookie("token",token)

  res.status(201).json(
    {
        message:"Login Successfully",
        user:{
            username:user.username,
            email:user.email
        }
        ,token
    }
  )

}

module.exports= {
    registerController,
    loginController
}