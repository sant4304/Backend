import React, { useState } from 'react'
import axios from "axios"
import { useAuth } from '../hooks/useAuth'
const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {loading,handleLogin} = useAuth()
 
    async function handleSubmit(e){
      e.preventDefault();
      console.log("hello")
      console.log(username,password)
    //   const response = await axios.post("http://localhost:3000/api/auth/login",{
    //     username,
    //     password
    //   },{
    //     withCredentials:true
    //   })

    //   console.log(response.data)
      
    await handleLogin(username,password)
    console.log("user logged in")

    }

  return (
    <main>
        <h1>Login</h1>
        <form action="" onSubmit={handleSubmit}>

            <input 
            onChange={(e)=>{setUsername(e.target.value)}}
            type="text" 
            name='username' 
            id='username' 
            placeholder='Enter Youe Username' />

            <input 
            onChange={(e)=>{setPassword(e.target.value)}}
            type="password" 
            name='password' 
            id='password' 
            placeholder='Enter Your Password' />

            <button type='submit'>Submit</button>
        </form>
    </main>
  )
}

export default Login