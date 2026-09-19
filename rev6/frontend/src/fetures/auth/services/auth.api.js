/* eslint-disable no-useless-catch */
import axios from "axios";

const api = axios.create(
    {
        baseURL:"http://localhost:3000/api/auth",
        withCredentials:true
    }
)
export async function login(username,password) {
     
    try{
        const response = await api.post("/login",{
            username,
            password
        },{
            withCredentials:true
        })

        return response.data
    }
    catch(err){
        throw err
    }
}

export async function register(username,password,email){
    try{
        const response = await api.post("/register",{
            username,
            password,
            email
        },{
            withCredentials:true
        })
        return response.data
    }
    catch(err){
        throw err
    }
}