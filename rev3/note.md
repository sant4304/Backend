


 authRouters.post("/register",async(req,res)=>{
     try {
         const {name,email,password} = req.body
         const user = await userModel.create({
             name,
             email,
             password
         })
         res.status(200).json({msg:"registered",user})
     } catch (error) {
         res.status(400).json({err:error.message})
     }
 }   )