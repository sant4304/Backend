const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controllers")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})
const identifyUser = require("../middleware/auth.middleware")


// /*
// * POST /api/posts [protected]
// * - req.body = {caption,imge-file}
// * /api/posts
// */

postRouter.post("/",upload.single("image"), identifyUser,postController.createPostController)

/*
* GET /api/posts/[protected]
*/ 
postRouter.get("/",identifyUser  ,postController.getPostController)

/*
* GET /api/posts/details/:postId
* return details about specific post
*/

postRouter.get("/details/:postId",identifyUser,postController.getPostDetails)

postRouter.post("/like/:postId",identifyUser,postController.likePostController)

module.exports = postRouter