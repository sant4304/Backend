import axios from "axios";

export async function login(username,password){

    const response = await axios.post("http://localhost:3000/api/auth/login",{
        username,
        password
    },{
        withCredentials:true
    })

    return response.data
}

export async function register(username,email,password){

    const response = await axios.post("http://localhost:3000/api/auth/register",{
        username,
        email,
        password
    },{
        withCredentials:true
    })

    return response.data
}