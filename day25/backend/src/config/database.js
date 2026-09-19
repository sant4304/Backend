const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connet to Db")
    })
    .catch((err)=>{
        console.log("error connecting to db",err)
    })
}




// async function connectToDb(){
//     await mongoose.connect(process.env.MONGO_URI)
//     console.log("Connect To Db")
// }

module.exports = connectToDb