import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";
import {body , validationResult} from "express-validator";
import { registerValidation } from "../validation/auth.validation.js";


const authRouter =  Router()
/**
 * /api/auth/register 
 */ 
authRouter.post("/register",registerValidation,registerUser)




export default authRouter