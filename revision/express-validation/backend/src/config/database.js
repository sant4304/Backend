import mongoose from "mongoose";

async function  connectToDb(){
    await mongoose.connect(process.env.MANGO)
    console.log("Connect To Db")
}

export default connectToDb