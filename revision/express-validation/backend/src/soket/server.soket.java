import {Server} from "socket.io"

let io 

export function initSoket(httpServer){
    io = new Server(httpServer,{
        cors:{
            origin:"http://localhost:5173",
            credentials:true
        }
    })

    console.log("Soket.io server is running")

    io.on("connection",(soket)=>{
        console.log("A user is connected to " ,+soket.id)
    })

}

export function getIo(){
    if(!io){
        throw new Error("Soket.io is not initialized ") 
    }
    return io
}