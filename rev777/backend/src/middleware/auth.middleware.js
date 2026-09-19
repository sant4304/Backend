 const jwt = require("jsonwebtoken")
async function idetifyUser(req,res,next){
    const token = req.cookies.token
    if(!token){
        return res.status.json({message:"Token is not found"})
    }
   
    let decoded = null
    try{
         decoded = jwt.verify(token,process.env.JWT_SEC)
    }
    catch(err){
        res.status(401).json({message:"Unauthorized access"})
    }

    req.user = decoded

    next()

}

module.exports = idetifyUser