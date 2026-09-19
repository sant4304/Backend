require("dotenv").config()
const app = require("./src/app")

const connectToDb = require("./src/config/database")

connectToDb()

// app.listen(3000,()=>{
//     console.log("Running")
// })

// const express = require("express")
// const app = express()
// const multer =require("multer")
// const upload = multer({storage:multer.memoryStorage()})
// app.use(express.json())
// // app.use(express.urlencoded({ extended: true }));


// app.post("/",upload.single("image") ,async(req,res)=>{
//     console.log(req.body,req.file)
//     res.send("Hello")
// })
app.listen(3000,()=>{
    console.log("Server is running")
})