const mongoose = require("mongoose")

const userScheam = new mongoose.Schema(
    {
        username:{
            type:String,
            required:[true,"Username is required"],
            unique:[true,"Username is alredy exist"]
        },
        email:{
            type:String,
            required:[true,"Email Is  Required"],
            unique:[true,"Email is alredy exist"]
        },
        password:{
            type:String,
            required:[true,"Password is required"]
        }
    }
)

const userModel = mongoose.model("users",userScheam)

module.exports = userModel