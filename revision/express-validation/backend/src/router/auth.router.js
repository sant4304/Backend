import {Router} from "express"
import { getDetails,  getMe,  login, register, verifyEmail } from "../controllers/auth.controller.js"
import { registerValidation } from "../validation/auth.validator.js"
import { authUser } from "../middleware/auth.middleware.js"


const authRouter = Router()


authRouter.post("/register", register)
export default authRouter

authRouter.post("/login",login)
authRouter.get("/verify-email",verifyEmail)
authRouter.get("/get-me",authUser,getMe)

authRouter.get("/details" ,getDetails)