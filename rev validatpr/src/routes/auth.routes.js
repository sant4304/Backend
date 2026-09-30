import { Router } from "express";
import { body,validationResult } from "express-validator";
import { registerValidation } from "../validator/auth.validation.js";

const authROuter = Router()

authROuter.post("/register",registerValidation ,(req,res)=>{
    res.status(200).json({
        message:"reg"
    })
})
export default authROuter