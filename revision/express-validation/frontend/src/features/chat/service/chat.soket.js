import { io } from "socket.io-client";

export const initializedSoketConnection = () => {
  const soket = io("http://localhost:3000", {
    withCredentials: true,
  });

  soket.on("connect",()=>{
    console.log("Connect to Socket.io server")
  })
};
