
require("dotenv").config()
const connectToDb =require("./src/config/databse")
const app = require("./src/app")


connectToDb()



app.listen(3000,()=>{
    console.log("Surver is Runing")
})