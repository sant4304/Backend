export async function  registerUser(req,res,next){
res.status(200).json(
    {
        message:"User is registerd"
    }
)
}
/******************************************************/ 
// export async function  registerUser(req,res,next){
//    try{
//     throw new Error(user)
//    }
//    catch(err){
//     err.status=400
//     next(err)
//    }
// }

/****************************************************************/ 

// export async function  registerUser(req,res,next){
//     try{
//         const err= new Error("Password is week")
//         err.status =400
//         throw(err)
//     }
//     catch(err){
//         next(err)
//     }
// }
/***********************************************************************/ 

// async function registerUser(req, res, next) {
// try{
//     const err = new Error("Encounter error while registering")
//     err.status =400
//     throw(err)
// }
// catch(err){
//     next(err)
// }
// }

// export default { registerUser };