import { useDispatch } from "react-redux"
import { setError, setLoading, setUser } from "../auth.slice"
import { getMe, login, register } from "../service/auth.api"


export function useAuth(){

    const dispatch = useDispatch()

    async function handleRegister({email,username,password}){
        try{
            dispatch(setLoading(true))
            const data = await register({email,username,password})
        }
        catch(err){
            dispatch(setError(err.response?.data?.message || "Registration failed"))
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    async function handleLogin({email,password}){
       try{
        setLoading(true)
         const data = await login({email,password})
         dispatch(setUser(data.user))
       }
       catch(err){
        dispatch(setError(err.response?.data?.message || "Login Failed"))
       }
       finally{
        dispatch(setLoading(false))
       }
    }

    async function handleGetMe(){
        try{
            setLoading(true)
            const data = await getMe()
            dispatch(setUser(data.user))
        }
        catch(err){
        dispatch(setError(err.response?.data?.message || "Failed to fetched user"))
       }
       finally{
        dispatch(setLoading(false))
       }
    }

    return {handleRegister,handleLogin,handleGetMe}

}