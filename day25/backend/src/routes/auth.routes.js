const {Router} = require("express")
const authController = require("../controllers/auth.controllers")
const jwt = require("jsonwebtoken")
const authMiddleware =require("../middleware/auth.middleware")

const router = Router()


router.post("/register",authController.registerUser)

router.post("/login",authController.loginUser)

router.get("/get-me",authMiddleware.authUser, authController.getMe )

router.get("/logout",authMiddleware.authUser ,authController.logoutUser)

module.exports=router



// const express = require("express")
// const router = express.Router()