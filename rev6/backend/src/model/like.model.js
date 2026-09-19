const mongoose = require("mongoose")
const likeScheam = new mongoose.Schema(
    {
        post:{
            ref:"posts",
            type:String,
            required:[true,"post is required for like"]
        },
        user:{
           
           type:String,
           required:[true,"User is required"]
        }
    },
    {
        timestamps:true
    }
)
likeScheam.index({post:1,user:1},{unique:true})

const likeModel = mongoose.model("likes",likeScheam)

module.exports = likeModel