const express =  require("express")
const userRouter = express.Router()
const userController = require("../controllers/user.controller")
const identifyUser = require("../middleware/auth.middleware")

/*
* @route POST /api/follow/:userid
* @description Follow a user
* @access Private
*/

userRouter.post("/follow/:username",identifyUser,userController.folloUserController)

userRouter.post("/unfollow/:username",identifyUser,userController.unfollowUserController)
module.exports = userRouter
