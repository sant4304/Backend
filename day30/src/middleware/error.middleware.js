import dotenv from "dotenv"
dotenv.config()


function handleError(err,req,res,next){
    const response = {
        message:err.message
    }
    if(process.env.NODE_ENVIOROMENT === 'development'){
        response.stack = err.stack
    }
    res.status(err.status).json(response)
}

export default  handleError

/*******************************************************/ 
// function handleError(err,req,res,next){
//     res.status(err.status).json(
//         {
//             message:err.message,
//             stack:err.stack
//         }
//     )
// }

// export default  handleError

/**********************************************************/
// function handleError(err,req,res,next){
//     res.status(500).json(
//         {
//             message:err.message
//         }
//     )
// }

// export default  handleError