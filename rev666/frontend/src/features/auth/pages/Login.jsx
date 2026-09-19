import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
   
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
   
  const {user,handleLogin} = useAuth()

  const handleSubmit = async(e) =>{
    e.preventDefault()
    await handleLogin(username,password)
    console.log("User Logedin")


  }

  return (
    <main>
      <form action="" onSubmit={handleSubmit} className='form-container'>
        <input 
        onChange={(e)=>{setUsername(e.target.value)}}
        type="text" name='username' id='username' placeholder='enter username' />
        <input 
        onChange={(e)=>{setPassword(e.target.value)}}
        type="password" name='password' id='password' placeholder='enter password' />
        <button>Login</button>
      </form>
    </main>
  )
}

export default Login