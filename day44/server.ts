import "dotenv/config"
import app from "./src/app.js"

app.listen(3000,()=>{
    console.log("server is running")
})