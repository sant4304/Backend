import {Router} from "express"

import { getMe, login, register, verifyEmail } from "../controllers/auth.controllers.js"

import { loginValidator, registerValidator } from "../validators/auth.validator.js"
import { authUser } from "../middleware/auth.middleware.js"

const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @desc Register  new user
 * @access Public
 * @body {username,emial,password}
 */ 


authRouter.post("/register", registerValidator ,register)


/**
 * @route POST /api/auth/login
 * @desc Login the user and return jwt tokem
 * @access Public
 * @body {emial,password}
 */ 

authRouter.post("/login", loginValidator ,login)

/**
 * @route POST /api/auth/get-me
 * @desc give current login user details
 * @access Private
 */ 

authRouter.get("/get-me",authUser ,getMe)



/**     
 * @route  GET /api/auth/verify-email
 * @desc verify user email addres
 * @access Public
 * @body {token}
 */ 

authRouter.get("/verify-email",verifyEmail)

export default authRouter