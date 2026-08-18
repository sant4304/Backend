const express = require("express")
const noteModel = require("./model/notes.model")
const cors = require("cors")
const path = require("path")

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("./public"))

/*
* -POST /api/notes 
*  -Create new notes and save the data
* req.body ={title,description}
*/ 
app.post("/api/notes",async(req,res)=>{
    const {title,description} =req.body

    const note = await noteModel.create({
       title,description
    })

    res.status(201).json({
        message:"Notes Created",
        note
    })
})

/*
* -GET/api/notes
*  -Fetch all notes data from mongodb and send them in the response
*/ 

app.get("/api/notes", async(req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message:"Notes Fetched Successfully",
        notes:notes
    })
})


//find method data ko array ke form main store kartii hain and array ke andaar object ke form main data store kartii hain
//find method jo data return kartii hain bo array of object ke form main  return kartii hain

/*
* Delete /api/notes/:id
* Delete notes from id with params.id
*/ 

app.delete("/api/notes/:id",async(req,res)=>{
    const id =req.params.id
    // console.log(id)
    const delet = await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"Note deleted",
        delet
    })
})


/*
* -patch /api/notes/:id
* -update the description of notes bu id
* -req.body ={description}
*/ 

app.patch("/api/notes/:id",async(req,res)=>{
    const id = req.params.id
    const {description} = req.body
     await noteModel.findByIdAndUpdate(id,{description})
    res.status(200).json({
        message:"Notes Updated",
    })
})
console.log(__dirname)
console.log(express.static("./public"))

app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname, "../public/index.html"));
    // res.send("This is wild card")
})
module.exports= app