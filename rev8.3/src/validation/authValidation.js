import { body,validationResult } from "express-validator"

const validate = (req,res,next)=>{
        const error = validationResult(req)

        if(error.isEmpty()){
            return next()
        }

        res.status(201).json(
            {
                message:error.array()
            }
        )
    }

export const validation =  [
    body("username").isString().withMessage("enter the valid name"),
    body("password").custom((value)=>{
        if(value.length<6){
            throw new Error("must be grater than 6")
        }
         const passwordRagex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
         if(!passwordRagex){
            throw new Error ("Password  must be ")
         }

         return true
    }),
    validate
] 