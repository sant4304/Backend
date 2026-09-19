const express = require("express");
const authRouter = express.Router();
const idetifyUser = require("../middleware/auth.middleware")
const authController = require("../controllers/auth.controllers")



authRouter.post("/register",authController.registerController);

authRouter.post("/login",authController.loginController);

authRouter.get("/get-me",idetifyUser ,authController.getMeController)

module.exports = authRouter;
