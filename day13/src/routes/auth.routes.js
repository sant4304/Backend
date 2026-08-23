const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const crypto = require("crypto")
const authRouter = express.Router();

/*
 * here we can authRouter by app.use("api/auth",authROuter)
 * it look like api/auth/register   it is kind of preffix(api/auth) or this preffix is changabl
 */
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userAlreadyExist = await userModel.findOne({ email });

  if (userAlreadyExist) {
    return res.status(400).json({
      message: "User alredy exist",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex")

  const user = await userModel.create({
    name,
    email,
    password:hash
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_tokken", token);
  res.status(201).json({
    message: "User is Register",
    user,
    token,
  });
});

/*
* /api/auth/login  ()=> this fat arrow function is also called controller 
   bo sabhi function all callback tab execute hote hain jab unpee request ayegii
*/

// authRouter.post("/login",async(req,res)=>{
//    const{email,password} =req.body

//    // 1. find user by email
//    const user = await userModel.findOne({email})
//    if(!user){
//        return res.status(404).json({
//            message:"User not found"
//        })
//    }

//    // 2. compare password (plain text comparison — use bcrypt in production)
//    const isPasswordCorrect = password === user.password
//    if(!isPasswordCorrect){
//        return res.status(401).json({
//            message:"Invalid credentials"
//        })
//    }

//    // 3. sign JWT and send response
//    const token = jwt.sign(
//        {
//            id: user._id,
//            email: user.email
//        },
//        process.env.JWT_SECRET
//    )

//    res.cookie("jwt_tokken", token)
//    res.status(200).json({
//        message:"Login successful",
//        user,
//        token
//    })
// })

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(404).json({
      message: "User is not found",
    });
  }

  const isPasswordMatched = user.password ===crypto.createHash("md5").update(password).digest("hex")
  if (!isPasswordMatched) {
    res.status(401).json({
      message: "Invalid Password",
    });
  }
   const token =jwt.sign(
    {
        id:user._id
    },
    process.env.JWT_SECRET
   )

   res.cookie("jwt_toke",token)

   res.status(200).json({
    message:"Login Succesfully",
    user,
    token
   })

});

// authRouter.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find user
//         const user = await userModel.findOne({ email });

//         if (!user) {
//             return res.status(404).json({
//                 message: "User is not found"
//             });
//         }

//         // Compare password
//         const isPasswordCorrect = await bcrypt.compare(
//             password,
//             user.password
//         );

//         if (!isPasswordCorrect) {
//             return res.status(401).json({
//                 message: "Invalid email or password"
//             });
//         }

//         // Create JWT token
//         const token = jwt.sign(
//             { id: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: "1d" }
//         );

//         // Send response
//         res.status(200).json({
//             message: "Login successful",
//             token: token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email
//             }
//         });

//     } catch (error) {
//         console.log(error);

//         res.status(500).json({
//             message: "Server error"
//         });
//     }
// });


/*
 * /api/auth/protected
 */
authRouter.post("/protected", (req, res) => {
  console.log(req.cookies);
  res.status(200).json({
    message: "This is protected route",
  });
});
/*
 * /api/auth/get
 */
authRouter.get("/users", async (req, res) => {
  const reg = await userModel.find();

  res.status(200).json({
    message: "User data",
    note: reg,
  });
});
module.exports = authRouter;
