import React, { useState } from 'react'
import "../style/form.scss"
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'


const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const {handleLogin,loading} =useAuth()
  const navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault()
    // axios.post("http://localhost:3000/api/auth/login",{
    //   username,
    //   password
    // },{
    //   withCredentials:true
    // })
    // .then(res=>{
    //   console.log(res.data)
    // })
     if(loading){
      return(
        <h1>
          Loading...
        </h1>
      )
     }
    handleLogin(username,password)
    .then((res)=>{
      console.log(res)
      navigate("/")
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