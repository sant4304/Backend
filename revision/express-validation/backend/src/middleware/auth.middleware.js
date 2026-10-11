import jwt from "jsonwebtoken"

export function authUser(req,res,next){
   const token = req.cookies.token
   
   const decoded = jwt.verify(token, process.env.JWT_SECRATRE)
   
   

   req.user = decoded
   next()
}