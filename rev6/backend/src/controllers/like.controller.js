const postModel = require("../model/post.model")
const likeModel = require("../model/like.model")

async function likePostController(req,res){
    
    const id = req.user.id
    const username= req.user.username
    const postId = req.params.postId
    console.log(id)
    console.log(username)
    console.log(postId)
    // const post = await postModel.find(
    //     {
    //         user:id
    //     }
    // )
    const post = await postModel.findById(postId)

    const like = await likeModel.create(
        {
            post:postId,
            user:username
        }
    )

    res.status(201).json(
        {
            message:"Like",
            like
        }
    )
}

module.exports={likePostController}