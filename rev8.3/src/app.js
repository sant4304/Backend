import express from "express"
import authRouter from "./routes/auth.routes.js"
import handleError from "./middleware/authMiddleware.js"


const app = express()
app.use(express.json())

app.use("/api/auth",authRouter)

app.use(handleError)
export default app