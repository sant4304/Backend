import dotenv from "dotenv"
dotenv.config()

function handleError(err,req,res,next){
    
    const response = {
        message:err.message
    }
    if(process.env.NODE_DEVOLOPMENT ==="devlopment"){
        response.stack = err.stack
    }

    res.status(err.status).json(response)
}

export default handleError