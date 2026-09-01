const express = require("express")
const postModel = require("../model/post.model")
const identifyUser = require("../middleware/auth.middleware")
const likeController = require("../controllers/like.controller")


const likeRouter = express.Router()

likeRouter.get("/:postId",identifyUser,likeController.likePostController)

module.exports = likeRouter