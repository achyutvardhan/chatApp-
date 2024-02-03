import React from "react";
import ChatName from "../components/ChatName";
import Message from "../components/Message";
import "../css/Chatroom.css"
export default function Chatroom() {
  return (
    <>
      <div className="ext">
        <div className="int">
          <ChatName/>
          <Message/>
        </div>
      </div>
    </>
  );
}
