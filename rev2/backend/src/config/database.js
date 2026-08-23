const mongoose= require("mongoose")

function connedtToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connedted To Db")
    })
    
}

module.exports = connedtToDb