const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")

const authRouter = require("./routes/auth.routes")

const app = express()
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())

app.use("/api/auth",authRouter)



module.exports = app