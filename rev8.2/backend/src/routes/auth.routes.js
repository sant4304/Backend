const {Router} = require("express")

const authRouter = Router()
const authController = require("../controllers/auth.controller")
const idetifyUser = require("../middleware/auth.middleware")

authRouter.post("/register",authController.registerUser)
authRouter.post("/login",authController.loginUser)
authRouter.get("/details",authController.userDetails)

authRouter.get("/get-me",idetifyUser,authController.getMe)
authRouter.get("/logout", idetifyUser,authController.logOut)

module.exports = authRouter