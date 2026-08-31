const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const authRouter = express.Router();
const authController = require("../controllers/auth.controllers")

authRouter.post("/register",authController.registerController);

authRouter.post("/login",authController.loginController
)

authRouter.get("/user",authController.userController
)
module.exports = authRouter;
