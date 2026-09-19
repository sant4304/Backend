const express = require("express")
const authController = require("../controllers/auth.controllers")
const idetifyUser = require("../middleware/auth.middleware")
const authRouter = express.Router()

authRouter.post("/register",authController.registerController)
authRouter.post("/login",authController.loginController)
authRouter.get("/get-me",idetifyUser,authController.getmeController)
authRouter.get("/details",authController.userController)
module.exports = authRouter