const express = require("express")
const userRouter = express.Router()
const userController = require("../controllers/user.controller")
const idetifyUser = require("../middleware/auth.middleware")

userRouter.post("/follow/:username",idetifyUser,userController.folloUserController)

userRouter.post("/unfollow/:username",idetifyUser,userController.unfollowUserController)



module.exports = userRouter