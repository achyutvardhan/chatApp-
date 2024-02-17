import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Register.css";
export default function Register() {
  const navigate = useNavigate();
  const [errormessage, Seterrormessage] = useState("");
  const [details, SetDetails] = useState({
    email: "",
    password: "",
    confirm: "",
    username: "",
  });

  const { email, username, password, confirm } = details;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(details);

    //post request
    if(details.password === details.confirm&& details.password!= ""&& details.confirm!="")
    navigate("/login");
else 
Seterrormessage("password doesn't match")

  };
  return (
    <>
      <div className="reg-ext-cont">
        <div className="reg-int-cont">
          <h1>Sign Up</h1>
          <form action="" className="form-reg" onSubmit={handleSubmit}>
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              name="email"
              placeholder="xyz@gmai.com"
              value={email}
              onChange={(e) => {
                SetDetails((eve) => ({ ...eve, email: e.target.value }));
              }}
            />
            <label htmlFor="user-name">User name : </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              value={username}
              onChange={(e) => {
                SetDetails((eve) => ({ ...eve, username: e.target.value }));
              }}
            />
            <label htmlFor="email">Password : </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                SetDetails((eve) => ({ ...eve, password: e.target.value }));
              }}
            />
            <label htmlFor="email">Confirm password : </label>
            <input
              type="password"
              name="conpassword"
              id="conpassword"
              placeholder="confirm Password"
              value={confirm}
              onChange={(e) => {
                SetDetails((eve) => ({ ...eve, confirm: e.target.value }));
              }}
            />
            {errormessage && <p className="error-message">{errormessage}</p>}
            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
