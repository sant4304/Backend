import {Server} from "socket.io"

let io;

export function initSocket(httpServer){
    io = new Server(httpServer,{
        cors:{
            origin:"http://localhost:5173",
            credentials:true
        }
    })

    console.log("Socket io server is running")

    io.on("connection",(soket)=>{
        console.log("A user connected "+soket.id)
    })
}

export function getIo(){
    if(!io){
        throw new Error("Socket.io is not initiallized")
    }

    return io
}
