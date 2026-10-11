import { body, validationResult } from "express-validator"
 function  validate(req,res,next){
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(401).json({
            message:error.array()
        })
    }
    next()
 }
export const registerValidation =[
     body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isString()
        .withMessage("Username must be a string")
        .isLength({ min: 3, max: 20 })
        .withMessage("Username must be between 3 and 20 characters"),
    validate
]