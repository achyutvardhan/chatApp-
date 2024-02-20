import React, { useState } from "react";
import ChatName from "../components/ChatName";
import Message from "../components/Message";
import "../css/Chatroom.css";
import { CurrentUserProvider } from "../CurrentUserContext";
export default function Chatroom() {
  return (
    <>
      <div className="ext">
        <div className="int">
          <CurrentUserProvider>
            <ChatName />
            <Message />
          </CurrentUserProvider>
        </div>
      </div>
    </>
  );
}
