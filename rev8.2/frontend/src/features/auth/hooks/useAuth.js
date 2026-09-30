import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { login } from "../service/auth.api"


export const useAuth=()=>{
    const context = useContext(AuthContext)

    const {user,setUser,loading,setLoading} = context

    const handleLogin = async(username,password)=>{
        setLoading(false)
        const response = login(username,password)
        setUser(response.user)
    }

    return {user,loading,handleLogin}

}