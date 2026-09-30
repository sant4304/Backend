import { body,validationResult } from "express-validator"
const validate =(req,res,next)=>{
  const error = validationResult(req)

  if(error.isEmpty()){
    return next()
  }

  res.status(400).json(
    {
        error:error.array()
    }
  )
}

export const registerValidation =[
  body("username").isString().withMessage("st"),
  body("password").custom((value)=>{
    if(value.length<6){
        throw new Error("need more than 6")
    }

    const regx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    if(!regx.test(value)){
        throw new Error("uppp case")
    }
    return true
  }) ,
  validate
]