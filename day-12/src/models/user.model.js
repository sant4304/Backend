const mongoose = require("mongoose")


const userScehma = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"Alredy Regsterd With this gmail"]
    },
    
    password:String
})


const userModel = mongoose.model("user",userScehma)

module.exports= userModel