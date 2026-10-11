import "dotenv/config"
import app from "./src/app.js"
import connectTODB from "./src/config/database.js"
import { askQuestion } from "./src/services/ai.service.js"


askQuestion()

connectTODB()
app.listen(3000,()=>{
    console.log("Server is running")
})