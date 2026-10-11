import "dotenv/config"
import app from "./src/app.js"
import connectToDb from "./src/config/database.js"
import http from "http"
import { initSoket } from "./src/soket/server.soket.js"

const httpServer = http.createServer(app)

initSoket(httpServer)



connectToDb()


// app.listen(3000,()=>{
//     console.log("Server is running on 3000")
// })

httpServer.listen(3000,()=>{
    console.log("Server is running on 3000")
})