import React from 'react'
import { Link, useNavigate } from 'react-router'
import "../style/form.scss"
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

const Register = () => {

  const {loding,handleRegister} =useAuth()
  const [username, setusername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
 
   const handleSubmit = async(e)=>{
     e.preventDefault()
     await handleRegister(username,email,password)
     navigate("/")
   }

   if(loding){
    return(
      <main>
        <h1>Loading....</h1>
      </main>
    )
   }
   return (
     <div>
       <main>
         <div className="form-container">
           <h1>Register</h1>
           <form action="" onSubmit={handleSubmit}>
              <input 
              onChange={(e)=>{setusername(e.target.value)}}
              type="text" name='username' id='username' placeholder='Enter username'/>
              <input 
              onChange={(e)=>{setEmail(e.target.value)}}
              type="email" name='email' id='email' placeholder='Enter Email' />
              <input 
              onChange={(e)=>{setPassword(e.target.value)}}
              type="password" name='password' id='password' placeholder='Enter password' />
              <button type='submit' className='button primary-button'>Registerd</button>
           </form>
           <p>Alredy have an account ? <Link to={"/login"}>Login to account.</Link></p>
         </div>
       </main>
     </div>
   )
  
}

export default Register