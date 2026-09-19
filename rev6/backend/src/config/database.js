const mongoose = require("mongoose")

async function connectToDb(){
    await mongoose.connect(process.env.MONGO)
    console.log("Connect to db")
}

module.exports = connectToDb