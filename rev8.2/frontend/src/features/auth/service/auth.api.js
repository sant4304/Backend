import axios  from "axios";
// import { create } from "../../../../../backend/src/model/user.model";

// const api = create(
//     {
//         baseUrl :"http://localhost:3000/api/auth",

//          withCredentials:true
//     }
// )

export async function login(username,password){
    const response = await axios.post("http://localhost:3000/api/auth/login",{
        username,
        password
    },{
        withCredentials:true
    })

    return response.data
}