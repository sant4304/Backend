const express = require("express")

const app = express()
app.get('/',(req,res)=>{
    res.send("hello world")
})

app.get("/about",(req,res)=>{
  res.send("about page")
})
app.get("/home",(req,res)=>{
    res.send("Home Page")
})
app.get("/p",(req,res)=>{
    res.send("p")
})

app.listen(3000,()=>{
    console.log("Server is runing")
})