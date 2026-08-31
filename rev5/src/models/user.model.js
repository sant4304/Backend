const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        username :{
            type:String,
            unique:[true,"Username is alredy exist"],
            required:[true,"Username is required"]
        },
        email:{
            type:String,
            unique:[true,"Email is alredy exist"],
            required:[true,"email is required"]
        },
        password:{
            type:String,
            required:[true,"Password is required"]
        },
        bio:String,
        profileImage:{
            type:String,
            default:"https://ik.imagekit.io/qo7rvxny5/default.webp?updatedAt=1787501023310"
        }
    }
)

const userModel = mongoose.model("users",userSchema)

module.exports = userModel