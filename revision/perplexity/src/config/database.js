import mongoose from "mongoose";

async function connectTODB(){
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connect to db")
}

export default connectTODB