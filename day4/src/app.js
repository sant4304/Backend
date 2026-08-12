/*

server ko create karnaa
  server ko config karnaa


*/  


const express = require("express")

const app = express()
app.use(express.json())

const notes = [

    {

    }
]


app.post("/notes",(req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    res.send("notes created")

    console.log(notes)
})


app.get("/notes",(req,res)=>{
    res.send(notes)
})
app.get("/",(req,res)=>{
    res.send("Hello Wolrd")
})

/*****************delete**************************/
// when we send large data thart time we use body  (req.body) when we send data like single sentence or single line that we use params (req.params.index)
/******************params*****************/
app.delete("/notes/:index",(req,res)=>{
    console.log(req.params.index)
    delete notes[req.params.index]

    res.send("notes deleted")
})


/*          patch/notes/:index
            req.body={descripttion :-"sample modified description"}
*/

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description
    res.send("notes is updated")
})
module.exports = app