async function registerController(req,res,next){
         try{
          res.send("user is registerf")
         }catch(err){
            err.status =401
            next(err)
         }
}

export default {registerController}