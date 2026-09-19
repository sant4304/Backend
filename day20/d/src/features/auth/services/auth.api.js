/* eslint-disable no-useless-catch */
// {
// // export async function register(username,email,password){
// //     // eslint-disable-next-line no-useless-catch
// //     try{
// //         // eslint-disable-next-line no-unused-vars
// //         const response = await axios.post("http://localhost:3000/api/auth/register",{
// //             username,
// //             email,
// //             password
// //         },{
// //             withCredentials:true
// //         })
     
// //         return response.data
// //     }
// //     catch(err){
// //         throw err
// //     }
// // }

// // export async function login(email,password){
// //      // eslint-disable-next-line no-useless-catch
// //      try{
// //         // eslint-disable-next-line no-unused-vars
// //         const response = await axios.post("http://localhost:3000/api/auth/login",{
// //             email,
// //             password
// //         },{
// //             withCredentials:true
// //         })

// //        return response.data
// //      }
// //      catch(err){
// //         throw(err)
// //      }
// // }

// }
import axios from "axios"

const api = axios.create(
    {
        baseURL:"http://localhost:3000/",
        withCredentials:true
    }
)

export async function register(username,email,password){
    // eslint-disable-next-line no-useless-catch
    try{
        // eslint-disable-next-line no-unused-vars
        const response = await api.post("/register",{
            username,
            email,
            password
        })
     
        return response.data
    }
    catch(err){
        throw err
    }
}

export async function login(username,password){
     // eslint-disable-next-line no-useless-catch
     try{
        // eslint-disable-next-line no-unused-vars
        const response = await api.post("/api/auth/login",{
            username,
            password
        })

       return response.data
     }
     catch(err){
        throw(err)
     }
}

export async function getMe(){
    try{
        const response = await api.get("/get-me")
        return response.data
    }
    catch(err){
        throw err
    }
}

