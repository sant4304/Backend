const express = require("express")
const noteModel = require("./models/notes.models")

const app = express()
app.use(express.json())

/*
 POST/notes
 req.body =>{title,description}
*/

app.post("/notes",async(req,res)=>{
    const{title,description,age}=req.body

    const note = await noteModel.create({
        title,description,age
    })

    res.status(200).json({
        message:"Note created successfully",
        note
    })
})


module.exports=app