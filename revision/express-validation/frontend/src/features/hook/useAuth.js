import { useDispatch } from "react-redux"
import { setError, setLoading, setUser } from "../auth/auth.slice"
import { login, register,getMe } from "../auth/service/auth.api"


export const useAuth =()=>{
    const dispatch = useDispatch()

    async function  handelRegister({email,username,password}){
         try{
            dispatch(setLoading(true))
            const data = await register({email,username,password})
         }
         catch(err){
            dispatch(setError(err.response?.data?.message || "Registration Failed"))
         }
         finally{
            dispatch(setLoading(false))
         }
    }

 
    
    // async function handleLogin({email,password}){
    //     try{
    //         dispatch(setLoading(true))
    //         const data = await login({email,password})
    //         dispatch(setUser(data.user))
    //     }catch(err){
    //       dispatch(setError(err.response?.data?.message ||"Login Failed"))
    //     }
    //      finally{
    //         dispatch(setLoading(false))
    //      }
    // }

    async function handleLogin({ email, password }) {
    try {
        console.log("1️⃣ LOGIN FUNCTION");

        dispatch(setLoading(true));

        const data = await login({ email, password });

        console.log("2️⃣ API DATA:", data);
        console.log("3️⃣ USER:", data?.user);

        dispatch(setUser(data?.user));

        console.log("4️⃣ USER DISPATCHED");

    } catch (err) {
        console.log("❌ LOGIN ERROR:", err);

        dispatch(
            setError(
                err.response?.data?.message || "Login Failed"
            )
        );
    } finally {
        dispatch(setLoading(false));
    }
}

    async function handelGetMe(){
      try{
        dispatch(setLoading(true))
        const data = await getMe()
        dispatch(setUser(data.user))
      }
      catch(err){
        dispatch(setError(err.response?.data?.message || "failed to fetched user"))
      }
      finally{
        dispatch(setLoading(false))
      }
    }


    return {handelRegister,handleLogin ,handelGetMe}
}