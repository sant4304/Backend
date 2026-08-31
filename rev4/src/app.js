require("dotenv").config()
const express = require("express")
const authRouters = require("./routes/auth.router")
const cookieParser = require("cookie-parser")
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouters)

module.exports= app