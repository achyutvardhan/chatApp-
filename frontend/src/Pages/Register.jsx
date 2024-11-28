import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Register.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigate = useNavigate();
  const [errormessage, Seterrormessage] = useState("");
  const [details, SetDetails] = useState({
    email: "",
    password: "",
    confirm: "",
    username: "",
    phoneno: "",
  });

  const { email, username, password, confirm, phoneno } = details;

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(details);

    //post request
    if (
      details.password === details.confirm &&
      details.password != "" &&
      details.confirm != ""
    ) {
      const result = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: details.email,
          username: details.username,
          password:  details.confirm,
          phoneno: Number(details.phoneno),
        }),
      });
      const response = await result.json();
      console.log(response);
      if (result.status == 201) {
        toast.success("Successfully registered! Now login...");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        for(let i=0;i<response.message.length;i++){
          toast.error(response.message[i]);
        }
      }
    } else {
      Seterrormessage("Password doesn't match");
    }
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
              required
            />
            <label htmlFor="Phone-no">Phone no : </label>
            <input
              type="number"
              name="phoneno"
              id="phoneno"
              placeholder="123456789"
              value={phoneno}
              onChange={(e) => {
                SetDetails((eve) => ({ ...eve, phoneno: e.target.value }));
              }}
              required
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
              required
            />
            <label htmlFor="Pass">Password : </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                SetDetails((eve) => ({ ...eve, password: e.target.value }));
              }}
              required
            />
            <label htmlFor="conPass">Confirm password : </label>
            <input
              type="password"
              name="conpassword"
              id="conpassword"
              placeholder="confirm Password"
              value={confirm}
              onChange={(e) => {
                SetDetails((eve) => ({ ...eve, confirm: e.target.value }));
              }}
              required
            />

            {errormessage && <p className="error-message">{errormessage}</p>}
            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
