const express =  require("express")
const cookieParser = require("cookie-parser")
const connectToDb = require("./config/database")
const morgan = require("morgan")
const cors = require("cors")


const authRoutes = require("../src/routes/auth.routes")

const app = express()

connectToDb()
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",authRoutes)




module.exports=app