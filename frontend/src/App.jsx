import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatroom from "./Pages/Chatroom";
import Nopage from "./Pages/Nopage";
import Login from "./Pages/Login";
import "./App.css";
import Privateroute from "./Pages/Privateroute";
import Register from "./Pages/Register";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Privateroute />}>
              <Route path="/" element={<Chatroom />} exact />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Nopage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
