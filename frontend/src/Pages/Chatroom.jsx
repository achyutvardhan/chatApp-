import React, { useState , useContext, useEffect, useRef } from "react";
import ChatName from "../components/ChatName";
import Message from "../components/Message";
import "../css/Chatroom.css";
import { io } from "socket.io-client";
import { CurrentUserProvider } from "../CurrentUserContext";
import {ContactProvider} from "../ContactContext"
import {AuthContext} from "../AuthContext"
export default function Chatroom() {
  const {user} = useContext(AuthContext);
  // const currentUser = selectedUser.userId;
  const socket = useRef()
  useEffect(()=>{
    console.log("socket connection")
    if(user){
        socket.current = io("http://localhost:3000", {
          withCredentials: true,
        });
        socket.current.on("connect", () => {
          console.log("Connected to soocket.current.cket server with ID:", socket.current.id);
        });
        socket.current.emit("add-user" ,user.userId )
    }
  },[])
  return (
    <>
      <div className="ext">
        <div className="int">
          <CurrentUserProvider>
            <ContactProvider>
            <ChatName />
            <Message socket= {socket}/>
            </ContactProvider>
          </CurrentUserProvider>
        </div>
      </div>
    </>
  );
}
