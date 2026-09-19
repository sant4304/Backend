import React, { useState } from 'react'
import axios from "axios"
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {user,loading,handleLogin} = useAuth()
  
    const handleSubmit =(e)=>{
        e.preventDefault();

        // axios.post("http://localhost:3000/api/auth/login",{
        //     username,
        //     password
        // },
        //  {
        //     withCredentials:true
        //  })
        //  .then((res)=>{
        //     console.log(res.data)
        //  })

        handleLogin(username,password)
        .then((res)=>{
            console.log(res)
        })
    }

     

  return (
    <main>
        <form action="" onSubmit={(e)=>{handleSubmit(e)}}>
            <input 
            onChange={(e)=>{setUsername(e.target.value)}}
            type="text" name="username" id="username" placeholder='Enter the username'/>
            <input 
            onChange={(e)=>{setPassword(e.target.value)}}
            type="password" name='password' id="password" placeholder='Enter password'/>
            <button type='submit'>Login</button>
        </form>
    </main>
  )
}

export default Login