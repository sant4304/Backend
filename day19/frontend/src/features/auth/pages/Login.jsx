import React, { useState } from 'react'
import "../style/form.scss"
import { Link } from 'react-router'
import axios from 'axios'
const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e){
    e.preventDefault()
    axios.post("http://localhost:3000/api/auth/login",{
      username,
      password
    },{
      withCredentials:true
    })
    .then(res=>{
      console.log(res.data)
    })
  }
  return (
    <main>
       <div className='form-container'>
        <h1 className='lo'>Login</h1>
        <form action="" onSubmit={handleSubmit}>
          <input 
          onInput={(e)=>setUsername(e.target.value)}
          type="text" 
          name="username" 
          placeholder='Enter  Username'/>
          <input
          onInput={(e)=>setPassword(e.target.value)}
          type="text" 
          name='password' 
          placeholder='Enter password' />
          <button type='submit'>Login</button>
        </form>
        <p>Alredy have an account  ? <Link to="/register" className='toggleAuthForm'> Register</Link> </p>
       </div>
    </main>
  )
}

export default Login