const express = require("express")

const app = express()

app.use(express.json())

const notes = []

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.post("/notes",(req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    res.send("notes created")
})

app.get("/notes",(req,res)=>{
    res.send(notes)
})

let port =3000
app.listen(port,()=>{
    console.log(`Server is runing on port ${port}`)
})