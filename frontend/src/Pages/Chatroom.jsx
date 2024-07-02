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
    if(user){
        socket.current = io("http://localhost:3000");
        socket.current.emit("add-user" ,user.userId )
    }
  },[user])
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
