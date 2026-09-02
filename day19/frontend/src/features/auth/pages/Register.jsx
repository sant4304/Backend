import React, { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e){
    e.preventDefault()

    axios.post("http://localhost:3000/api/auth/register",{
      username,
      email,
      password
    },{
      withCredentials:true
    }
  )
    .then(res=>{
      console.log(res.data)
    })
  }

  return (
    <main>
      <div className="form-container">
        <h1 className="lo"> Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => {setUsername(e.target.value); }}
            type="text"
            name="usename"
            placeholder="Enter username"
          />
          <input
            onInput={(e) => {setEmail(e.target.value);}}
            type="text"
            name="email"
            placeholder="Enter email"
          />
          <input
            onInput={(e) => {setPassword(e.target.value);}}
            type="text"
            name="password"
            placeholder="Enter password"
          />
          <button type="submit"> Register</button>
        </form>
        <p>
          Alredy have an account ?{" "}
          <Link to="/login" className="toggleAuthForm">
            {" "}
            Login
          </Link>{" "}
        </p>
      </div>
    </main>
  );
};

export default Register;
