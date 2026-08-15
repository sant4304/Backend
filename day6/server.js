const app = require("./src/app")

const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb+srv://santoshsk3304sk_db_user:0kTaStHhKYfFCJsv@cluster0.6e130xo.mongodb.net/day-6")
    .then(()=>{
        console.log("Connected")
    })
    .catch((err)=>{
        console.log("Error ",err)
    })
}

connectToDb()

app.listen(3000,()=>{
    console.log("Server is Running")
})