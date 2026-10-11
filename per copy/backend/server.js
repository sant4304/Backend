import "dotenv/config"
import app from "./src/app.js"
import connectDB from "./src/config/database.js"
// import { testAi } from "./src/services/ai.services.js"
import http from "http"
import { initSocket } from "./src/sockets/server.sokets.js"

const PORT =process.env.PORT || 8000

const httpServer = http.createServer(app);

// testAi()
initSocket(httpServer)
connectDB()
.catch((err)=>{
    console.error("Mongodb connection is faild: ",err)
    process.exit(1)
})


httpServer.listen(PORT,()=>{
    console.log("Server is running")
})