const mongoose =require("mongoose")

async function connectToDb(){
    await mongoose.connect("mongodb+srv://sandev9818_db_user:PSxf54ZDXTG8dlEq@cluster0.mapmi7k.mongodb.net/rev4")
    console.log("Connect To Db")
}

module.exports = connectToDb