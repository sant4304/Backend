import React from 'react'
import { Link } from 'react-router'
import "../style/form.scss"
const Register = () => {
 
   const handleSubmit = (e)=>{
     e.preventDefault()
   }
   return (
     <div>
       <main>
         <div className="form-container">
           <h1>Register</h1>
           <form action="" onSubmit={handleSubmit}>
              <input type="text" name='username' id='username' placeholder='Enter username'/>
              <input type="email" name='email' id='email' placeholder='Enter Email' />
              <input type="password" name='password' id='password' placeholder='Enter password' />
              <button type='submit' className='button primary-button'>Registerd</button>
           </form>
           <p>Alredy have an account ? <Link to={"/login"}>Login to account.</Link></p>
         </div>
       </main>
     </div>
   )
  
}

export default Register