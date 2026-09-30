import express from "express"
import authROuter from "./routes/auth.routes.js"

const app = express()

app.use(express.json())

app.use("/api/auth",authROuter)
export default app