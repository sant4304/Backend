import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register } from "../services/auth.api";


export const useAuth =()=>{
    const context = useContext(AuthContext)
    const {user,setUser,loading,setLoading} = context
    
    const handleLogin =async(usename,password)=>{
        setLoading(true)
        const response = await login(usename,password)
        setUser(response.user)
        setLoading(false)
    }

    const handleRegister =async(usename,email,password)=>{
        setLoading(true)
        const response = await register(usename,email,password)
        setUser(response.user)
        setLoading(false)
    }

    return {user,loading,handleLogin,handleRegister}
}

// import { useContext } from "react"
// import { AuthContext } from "../auth.context"


// export const useAuth =()=>{
//     const context = useContext(AuthContext)
//     const {user,setUser,loading,setLoading} =context
// }