import express  from "express"
import authRouter from "./routes/auth.routes.js";
import handleError from "./middleware/error.middleware.js";
import { body, validationResult } from "express-validator";
const app = express()

app.use(express.json())

app.use("/api/auth",authRouter)

app.use(handleError)

export default app;