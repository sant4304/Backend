import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userScheama = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        password:{
            type:String,
            required:true,
            trim:true,
            minlength:6
        },
        verified:{
            type:Boolean,
            default:false
        }
    },
    {
        timestamps:true
    }
)

// userScheama.pre("save",async function(){
//     if(!this.isModified(this.password))return
//     this.password = await bcrypt.hash(this.password,10)
// })

// userScheama.methods.comparePassword = async function(password){
//     return await bcrypt.compare(password,this.password)
// }
// userScheama.methods.ccomparePassword = function(candidatePassword){
//     return bcrypt.compare(this.password,candidatePassword)
// }



const userModel = mongoose.model("User",userScheama)

export default userModel