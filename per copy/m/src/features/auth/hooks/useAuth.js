 import {useDispatch} from "react-redux"

import { register,login,getMe } from "../service/auth.api"

import { setUser,setLoading,setError } from "../auth.slice"

export function useAuth(){
    const dispatch = useDispatch()
    async function handlRegister({email,username,password}){
         try{
            dispatch(setLoading(true))
            const data = await register({email,username,password})
         }
         catch(err){
            dispatch(setError(err.response?.data?.message ||"Registration failde"))
         }
         finally{
            dispatch(setLoading(false))
         }
    }

    async function handleLogin({email,password}){
        try{
            dispatch(setLoading(true))
            const data = await login({email,password})
            dispatch(setUser(data.user))
        }
        catch(err){
             dispatch(setError(err.response?.data?.message ||"Login Failed"))
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe(){
        try{
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        }
        catch(err){
            (setError(err.response?.data?.message ||"Fail to fetch the user data"))
        }
        finally{
            dispatch(setLoading(false))
        }
    }
    
    return{
        handlRegister,
        handleLogin,
        handleGetMe
    }
    
}