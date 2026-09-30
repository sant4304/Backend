import dotenv from "dotenv"
dotenv.config()

function hanleError(err,req,res,next){
    const response = {
        message:err.message
    }
    if(process.env.NODE_ENVIOROMENT==="development"){
        response.stack = err.stack
    }
    res.status(err.status).json(response)
}

export default hanleError