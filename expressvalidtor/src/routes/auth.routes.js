import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { body ,validationResult } from "express-validator";



const authRouter = Router()


authRouter.post("/register",[
    body("username").isString().withMessage("me"),
    body("email").isEmail().withMessage("em"),
    (req,res,next)=>{
        const errors = validationResult(req)
        if(errors.isEmpty()){
            return next()
        }
        res.status(400).json(
            {
                errors:errors.array()
            }
        )
    }
] ,registerUser)
export default authRouter