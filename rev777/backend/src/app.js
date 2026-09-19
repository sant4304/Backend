const express = require("express")

const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true,
        methods:["GET","POST","PUT","DELETE"]
    }
))

const authRouter = require("./routes/auth.routes") 
const postRouter = require("./routes/post.routes")
const userRouter = require("./routes/user.routes")

app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)

app.use("/api/users",userRouter)
module.exports = app