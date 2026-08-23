const express = require("express");
const noteModel = require("./model/notes.model");

const app = express();
const cors = require("cors")
app.use(express.json());
app.use(cors())
const notes = [{}];

// app.post("/notes",(req,res)=>{
//     console.log(req.body)
//     notes.push(req.body)
//     res.status(200).json({
//         message:"Note created"
//     })
// })

// app.get("/notes",(req,res)=>{
//     res.status
//     (200).json({
//         message:"Notes fetched",
//         note:notes
//     })
// })


// app.delete("/notes/:id",(req,res)=>{
//     const id = req.params.id
//     delete notes[req.params.id]
//     res.status(200).json({
//         message:"Notes deleted"
//     })
// })

// app.patch("/notes/:id",(req,res)=>{
//     const id = req.params.id
//     notes[req.params.id].title = req.body.title
//     notes[req.params.id].description =req.body.description

//     res.status(200).json({
//         message:"Notes Updated"
//     })
// })


app.post("/api/notes",async(req,res)=>{
    const {title,description} =req.body

    const note = await noteModel.create({
        title,
        description
    })

    res.status(200).json({
        message:"Notes Created",
        note
    })
})

app.get("/api/notes",async(req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message:"Notes fetched",
        notes
    })

})

app.delete("/api/notes/:id",async(req,res)=>{
    const id = req.params.id
    const noteDeleted = await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"Notes is deletd",
        note:noteDeleted
    })
})

app.patch("/api/notes/:id",async(req,res)=>{
    const id = req.params.id
    const {title,description}=req.body
    const notesUpdated = await noteModel.findByIdAndUpdate(id,{
        title,
        description
    })
    res.status(200).json({
        message:"Updated",
        note:notesUpdated
    })
})
module.exports = app;
