const express =require("express")
const postRouter = express.Router()
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})
const postController = require("../controllers/post.controller")
const idetifyUser = require("../middleware/auth.middleware")


postRouter.post("/",upload.single("image"),idetifyUser,postController.createPostController)

postRouter.get("/",idetifyUser,postController.getPostController)

postRouter.get("/details/:postId",idetifyUser,postController.getPostDetails)

postRouter.post("/like/:postId",idetifyUser,postController.likePostController)

postRouter.get("/feed",idetifyUser,postController.getFeedController)
module.exports = postRouter