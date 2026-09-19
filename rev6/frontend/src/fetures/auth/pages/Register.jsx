import axios from 'axios'
import React, { useState } from 'react'

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const handeleSubmit = (e) =>{
    e.preventDefault()
    console.log("hell")
    console.log(username,password,email)

    axios.post("http://localhost:3000/api/auth/register",{
      username,
      email,
      password
    },{
      withCredentials:true
    }).then((res)=>{console.log(res.data)})
  }

  return (
    <div>
      <div>
        <h1>Register</h1>
      </div>
      <form action="" onSubmit={handeleSubmit}>
        <input 
        onInput={(e)=>{setUsername(e.target.value)}}
        type="text" name="username" placeholder='Enter Username' />
        <input 
        onInput={(e)=>{setPassword(e.target.value)}}
        type="text" name="password" placeholder='Enter password' />
        <input 
        onInput={(e)=>{setEmail(e.target.value)}}
        type="text" name="email" placeholder='Enetet email' />
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register