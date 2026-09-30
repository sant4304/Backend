import React, { useState } from "react";
import "../style/form.scss"
import { useAuth } from "../hooks/useAuth";
import { useNavigate ,Link} from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, loading, handleLogin } = useAuth();

  const handleSubmit = async (e) => {
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
    await handleLogin(username, password);
    console.log("User Logged in");
    navigate("/");
    // handleLogin(username,password)
    // .then((res)=>{
    //     console.log(res)
    // })
  };

  if (loading) {
    return (
      <main>
        <h1>Loading... </h1>
      </main>
    );
  }

  return (
    <main>
                <div className="form-container">
          <h1>Login</h1>
          <form action="" onSubmit={handleSubmit}>

             <input 
             onInput={(e)=>{setUsername(e.target.value)}}
             type="text" 
             name='username' 
             id='username' 
             placeholder='Enter username'
             required/>

             <input 
             onInput={(e)=>{setPassword(e.target.value)}}
             type="password" 
             name='password' 
             id='password' 
             placeholder='Enter password' 
             required/>

             <button type='submit' className='button primary-button'>Login</button>

          </form>
          <p>Don't have an account ? <Link to={"/register"}>Create One.</Link></p>
        </div>
    </main>
  );
};

export default Login;
