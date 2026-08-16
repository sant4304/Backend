const mongoose= require("mongoose")

function connectToDb(){
       mongoose.connect(process.env.MOGO_URI)
       .then(()=>{
        console.log("Connected")
       })
}

module.exports=connectToDb