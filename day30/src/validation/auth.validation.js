import { body,validationResult } from "express-validator"
const validate =   (req,res,next)=>{
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


export const registerValidation =  [
    body("username").isString().withMessage("username is should be string"),
    body("email").isEmail().withMessage("valid emial addres"),
    // body("password").isLength({min:6,max:12}).withMessage("password should 6 character"),
     body("password").custom((value)=>{
        if(value.length<6){
            throw new Error("must be greater than 6 character")
        }
        const passwordRagex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        if(!passwordRagex.test(value)){
            throw new Error("Paaword must be containe at least")
        }
        return true
     }),
    validate
   ] 