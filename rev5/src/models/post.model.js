const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
    {
        caption:{
            type:String,
            default:""
        },
        imgURL:{
            type:String,
            default:[true,"Image Url is required for posting"]
        },
        user:{
            ref:"users",
            type:mongoose.Schema.Types.ObjectId,
            required:["true","User id is requires for creating a post"]
        }
    }
)

const postModel = mongoose.model("posts",postSchema)

module.exports = postModel