const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
    {
        caption:{
            type:String,
            default:""
        },
        imgURL:{
            type:String,
            required:[true,"Required for creating a post"]
        },
        user:{
            ref:"users",
            type:mongoose.Schema.Types.ObjectId, 
            required:[true,"Post must belong to a user"]
        }
    }
)

const postModel = mongoose.model("posts",postSchema)

module.exports = postModel