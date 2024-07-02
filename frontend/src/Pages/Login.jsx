import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"
import "react-toastify/dist/ReactToastify.css";

import { useContext } from "react";
import { AuthContext } from "../AuthContext";
//css
import "../css/Login.css";

const Login = () => {
  const { setUser, setIsAuthenticated  } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation (you can add more complex validation as needed)
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter your email and password.");
      return;
    }
    
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.status == 200) {
      // Successful login (redirect, store token, etc.)
      const data = await res.json();
      const decode = jwtDecode(data.token);
      console.log(decode);
      setUser({
        name: decode.userName,
        email: decode.email,
        userId : decode.userId
      });
      Cookies.set(`userId${decode.userName}` , decode.userId , { expires: 1 });
      Cookies.set(`token${decode.userName}` , data.token , { expires: 1 });
      setIsAuthenticated(true);
      toast.success("You have successfully logged in!", {});
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <Link to="/register" style={{ marginBottom: "2%" }}>
          register here
        </Link>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
