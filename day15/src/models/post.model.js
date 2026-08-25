const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
    {
        caption:{
            type:String,
            default:""
        },
        img_URL:{
            type:String,
            required:[true,"imgUrl is required for creating a post"]
        },
        user:{
            ref:"users",
            type:mongoose.Schema.Types.ObjectId,
            required:[true,"User id is required for creating a new post"]
        }
    }
)

const postModel = mongoose.model("post",postSchema)

module.exports = postModel