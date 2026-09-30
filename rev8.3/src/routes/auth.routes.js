import { Router } from "express";
import  authController from "../controllers/auth.controller.js"
import { body, validationResult } from "express-validator";
import { validation } from "../validation/authValidation.js";

const authRouter = Router()

authRouter.post("/register", validation ,authController.registerController)


export default authRouter