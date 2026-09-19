const jwt = require('jsonwebtoken')

async function identifyUser(req,res,next) {
       const token = req.cookies.token
        if(!token){
            return res.status(401).json(
                {
                    message:"Invalid tokken"
                }
            )
        }
    
        let decodecd
    
        try{
             decodecd = jwt.verify(token,process.env.JWT_SECRATE)
        }catch(err){
            return res.status(401).json({message:"unauthorized access"})
        }

        req.user = decodecd  
        next()
}

module.exports = identifyUser