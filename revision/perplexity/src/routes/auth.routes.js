import { Router } from "express";
import { getMe, login, register, verifyEmail } from "../controllers/auth.controllers.js";
import { authUser } from "../middleware/auth.middleware.js";


const authRouter = Router()

authRouter.post("/register",register)

authRouter.post("/login",login)

authRouter.get("/get-me", authUser  , getMe)

authRouter.get("/verify-email",verifyEmail)

export default authRouter