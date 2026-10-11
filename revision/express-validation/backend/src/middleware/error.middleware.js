import { response } from "express"

 function handleError(err,req,res,next){

    const response = {
        message:err.message,
       
    }
    if(process.env.ENIVIROMENT ==="dev"){
        response.stack=err.stack
    }
    res.status(400).json(
        {
            response
        }
    )
 }

 export default handleError