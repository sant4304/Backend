import { io } from "socket.io-client";

export const intitializeSocketConnection = ()=>{

    const socket = io("http://localhost:3000",{
        withCredentials:true
    })

    socket.on("connect" ,()=>{
        console.log("Connected to Soket.io server")
    })
}