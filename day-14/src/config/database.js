const mongoose = require("mongoose")

function  connectTODb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connect To Db")
    })
    
}

module.exports = connectTODb

