const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")

// const multer =require("multer")
// const upload = multer({storage:multer.memoryStorage()})


const authRouter = require("./routes/auth.router")
const postRouter = require("./routes/post.routes")
const userRouter = require("./routes/user.routes")
const likeRouter = require("./routes/like.routes")

app.use(express.json())
app.use(cookieParser())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth",authRouter)
// app.use("/api/posts",upload.single("image"),postRouter
// )
app.use("/api/posts",postRouter
)

app.use("/api/users",userRouter)
// app.use("/api/posts",postRouter)

app.use("/api/like",likeRouter)


module.exports = app