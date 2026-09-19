import React, { useState } from 'react'
import FormGroup from '../components/Formgroup'
import "../styles/register.scss"
import { Link } from 'react-router'




const Register = () => {


  const [username,setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  


  async function handleSubmit(e){
    e.preventDefault()
   
  }

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form action="" onSubmit={handleSubmit}>

          <FormGroup 
          value={username}
          onChange={(e)=>{setUsername(e.target.value)}}
          label="Name" 
          placeholder="Enter Your Name"/>

          <FormGroup 
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          label="Email" 
          placeholder="Enter Your Email"/>

          <FormGroup 
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          label="Password" 
          placeholder="Enter Your Password"/>

          <button className="button" typr="submit">Register</button>

        </form>
        <p>Alredy have an account ? <Link to="/login" >Login here</Link></p>
      </div>
    </main>

  )
}

export default Register