
require("dotenv").config()
const app = require("./src/app")
const connedtToDb = require("./src/config/database")

connedtToDb()

app.listen(3000,()=>{
    console.log("server is running on 3000")
})