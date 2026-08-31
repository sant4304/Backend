
require("dotenv").config()
const app = require("./src/app")

const connectTODb = require("./src/config/database")

connectTODb()

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})