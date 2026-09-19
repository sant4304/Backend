const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
    {
        caption:{
            type:String,
            default:""
        },
        imgURL:{
            type:String,
            required:[true,"ImgeUrl is required "]
        },
        user:{
            ref:"users",
            type:mongoose.Schema.Types.ObjectId,
            required:[true,"Username id is required for creating a post"]
        }
    }
)

const postModel = mongoose.model("posts",postSchema)

module.exports = postModel