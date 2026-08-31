const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controllers")



authRouter.post("/register",authController.registerController);

authRouter.post("/login",authController.loginController);

module.exports = authRouter;
