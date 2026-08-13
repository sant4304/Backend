const express = require("express")

const app = express()

app.use(express.json())

const notes = [
    {

    }
]


app.get("/",(req,res)=>{
    res.send("Holaa")
})


app.get("/notes",(req,res)=>{
    res.send(notes)
})

app.post("/notes",(req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    res.send("Notes Created")
    console.log(notes)
})

app.delete("/notes/:id",(req,res)=>{
    console.log(req.params.id)
    delete notes[req.params.id]
    res.send("Notes Delete")
})

app.patch("/notes/:id",(req,res)=>{

    notes[req.params.id].description =req.body.description
    res.send("Notes Updated")
})

module.exports= app