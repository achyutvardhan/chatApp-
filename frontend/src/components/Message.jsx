import React from "react";
import ChatHeader from "./ChatHeader";
import "../css/Message.css";
export default function Message() {
  return (
    <>
      <div className="extmess">
        <div className="intmess">
          <ChatHeader />
          <div className="line-1"></div>
          <div className="message-area">
            <div className="messages"></div>
            <div className="inp">
              <input type="text" name="" id="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
