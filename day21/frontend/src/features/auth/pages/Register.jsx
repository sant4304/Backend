import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import "../style/form.scss"
import { useAuth } from '../hooks/useAuth'
const Register = () => {

  const {loading,handleRegister} = useAuth()

  const [username, setUsername] = useState("")

  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")
 
   const navigate = useNavigate()

   const handleSubmit = (e)=>{
     e.preventDefault()
     handleRegister(username,email,password)
     console.log("You are registered")
     
     navigate("/")

   }

   if(loading){
    return(
      <main>
        <h1>Loading.....</h1>
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
              onChange={(e)=>{setUsername(e.target.value)}}

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