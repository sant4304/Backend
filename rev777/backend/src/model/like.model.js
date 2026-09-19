const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    post:{
        type:String,
        ref:"posts",
        required:[true,"Post id is required for like the post"]
    },
    user:{
        type:String,
        required:[true,"Username is requre of like a post"]
    }
},{
        timestamps:true
    }

)

likeSchema.index({post:1,user:1},{unique:true})

const likeModel = mongoose.model("likes",likeSchema)

module.exports = likeModel