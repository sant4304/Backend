import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
// import axios from "axios";
// import { useAuth } from "../../hooks/useAuth";
// import { useNavigate } from 'react-router'

const Login = () => {
  // const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {handleLogin,loading} = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    // axios
    //   .post(
    //     "http://localhost:3000/api/auth/login",
    //     {
    //       username,
    //       password,
    //     },
    //     {
    //         withCredentials
    //       : true,
    //     },
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //   });
    handleLogin(username,password)
    .then((res)=>{console.log(res)})
   
  };
  return (
    <div>
      <div>
        <h1>Login</h1>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <input
          onInput={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          name="username"
          placeholder="Enter the username"
        />
        <input
          onInput={(e) => {
            setPassword(e.target.value);
          }}
          type="text"
          name="password"
          placeholder="Enter Password"
        />
        <button>Go Home</button>
      </form>
    </div>
  );
};

export default Login;
