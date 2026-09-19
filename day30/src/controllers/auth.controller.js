export async function registerUser(req,res,next){
 res.status(201).json(
    {
        message:"User registerd successfully"
    }
 )
}

/******************************************/ 
// export async function registerUser(req,res,next){
//   try{
//     throw new Error(user);
//   }
//   catch(err){
//     err.status = 500
//     next(err)
//   }
// }


/************************************************************************/ 
// export async function registerUser(req,res,next){
//   try{
//     throw new Error(" Password is so week");
//   }
//   catch(err){
//     err.status = 400
//     next(err)
//   }
// }
/*********************************************************************/ 
// export async function registerUser(req,res,next){
//   try{
//     throw new Error(" Password is so week");
//   }
//   catch(err){
//     err.status = 400
//     next(err)
//   }
// }

/******************************************************************************/

// export async function registerUser(req,res,next){
  
//     const err=new Error(" Password is so week");
  
  
//     err.status = 400
//     next(err)
  
// }
/**********************************************************************/

// export async  function registerUser(req,res,next){
//     try{
//         throw new Error("encounter the error while registration")
//     }
//     catch(err){
//         console.log("error",err)
//         next(err)
//     }  
// }