const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/auth.controllers")
const idetifyUser = require("../middleware/auth.middleware")

authRouter.post("/register",authController.registerController
)

authRouter.post("/login",authController.loginController
)

authRouter.get("/get-me",idetifyUser,authController.getMeController)

authRouter.get("/users",authController.getController)
module.exports = authRouter

