const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})
const identifyUser = require("../middleware/auth.middleware")


// postRouter.post("/",postController.createPostController
// )
postRouter.post("/",upload.single("image"),identifyUser ,postController.createPostController
)

postRouter.get("/",identifyUser,postController.getPostController)

postRouter.get("/details/:postId",identifyUser,postController.getPostDetails)



module.exports=postRouter