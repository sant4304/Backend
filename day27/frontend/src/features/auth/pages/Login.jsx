import React, { useState } from 'react'
import "../styles/login.scss"
import FormGroup from '../components/Formgroup'
import { Link } from 'react-router'

const Login = () => {


  

    const [email, setEmail] = useState("")
    const [password , setPassword] = useState("")

    async function handleSubmit(e){
      e.preventDefault()


      
      
    }



  return (
    <main className="login-page">
        <div className="form-container">
            <h1>Login</h1>
            <form action="" onSubmit={handleSubmit}>

                 <FormGroup 
                 value={email}
                 onChange={(e)=>{setEmail(e.target.value)}}
                 label= "Email" 
                 placeholder="Enter Your Email"/>

                 <FormGroup 
                 value={password}
                 onChange={(e)=>{setPassword(e.target.value)}}
                 label="Password" 
                 placeholder="Enter Your Paasword"/>
                 {/* <input type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Ener "/> */}


                <button className="button" type="submit"> Login</button>
            </form>
            <p>Don't have an account ? <Link to="/register">Register here</Link></p>
        </div>
    </main>
  )
}

export default Login