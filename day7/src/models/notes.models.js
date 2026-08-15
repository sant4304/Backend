const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title:String,
    description:String,
    age:Number,
})


// we store data in this formte it called schemaa now here we can store data in the form of (string)
//aggar scheama main koi bho operation performe karnaa hain  to usmee model ki need hoti hain

const noteModel=mongoose.model("notes",noteSchema)

//when we store same type of data it is called collection and us collection ka naam kyaa hogaa mongoose.model("name of the collection",noteSchema)  bo es ptaa chaltaa hain 
//without model(noteModel) we can not performe single operarion 

module.exports=noteModel