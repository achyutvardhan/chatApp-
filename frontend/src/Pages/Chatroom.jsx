import React, { useState } from "react";
import ChatName from "../components/ChatName";
import Message from "../components/Message";
import "../css/Chatroom.css";
import { CurrentUserProvider } from "../CurrentUserContext";
import {ContactProvider} from "../ContactContext"
export default function Chatroom() {
  return (
    <>
      <div className="ext">
        <div className="int">
          <CurrentUserProvider>
            <ContactProvider>
            <ChatName />
            <Message />
            </ContactProvider>
          </CurrentUserProvider>
        </div>
      </div>
    </>
  );
}
