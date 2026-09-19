const mongoose = require("mongoose")

const followSchema = new mongoose.Schema(
    {
        follower:String,
        followee:String
    },
    {
        timestamps:true
    }
)
// followSchema.index({follower:1,followee:1},{unique:true})

const followModel = mongoose.model("follows",followSchema)

module.exports = followModel
